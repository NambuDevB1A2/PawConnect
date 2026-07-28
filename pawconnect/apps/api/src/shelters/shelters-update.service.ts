import { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { getImageIdByString } from '@/common/utils/upload.util';
import { PrismaService } from '@/prisma/prisma.service';
import { UpdateShelterDto } from '@/shelters/dto/update-shelter.dto';
import { SHELTER_IMAGE_SELECT, SHELTER_SELECT } from '@/shelters/shelter.select';
import { getDefaultBanner, isDefaultBanner, SheltersReadService } from '@/shelters/shelters-read.service';
import { SheltersUploadService } from '@/shelters/shelters-upload.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class SheltersUpdateService {
    constructor (
        private readonly prisma: PrismaService,
        private readonly sheltersReadService: SheltersReadService,
        private readonly sheltersUploadService: SheltersUploadService,
    ) {}

    // 내 보호소 정보 수정
    async update(auth: AuthRequest, updateShelterDto: UpdateShelterDto, file?: Express.Multer.File, files?: Express.Multer.File[]) {
        const shelter = await this.sheltersReadService.find(auth.shelterId, { ...SHELTER_SELECT, images: { select: SHELTER_IMAGE_SELECT } });

        const keepSet = new Set(updateShelterDto.imgShelterKeeps ?? []);
        const toDelete = shelter.images.filter(img => !keepSet.has(img.img));

        let uploadedImgBanner: string | undefined = shelter.imgBanner;
        let oldImgBanner: string | null = null;

        // 1. 이미지 업로드
        // 새로운 이미지로 교체
        if (file) {
            uploadedImgBanner = await this.sheltersUploadService.uploadBanner(file);
            
            if (!isDefaultBanner(shelter.imgBanner)) {
                oldImgBanner = shelter.imgBanner;
            }
        } 
        // 기존 이미지만 삭제
        else if (updateShelterDto.imgBannerRemoved && !isDefaultBanner(shelter.imgBanner)) {
            oldImgBanner = shelter.imgBanner;
            uploadedImgBanner = getDefaultBanner();
        }

        let uploadedImgShelter = files ? await this.sheltersUploadService.uploadImages(files) : [];
        if (!uploadedImgShelter) uploadedImgShelter = [];

        // 2. DB 수정
        try {
            await this.prisma.$transaction(async (tx) => {
                // 보호소 업데이트
                await tx.shelter.update({
                    where: { id: shelter.id },
                    data: {
                        address: updateShelterDto.address,
                        addressDetail: updateShelterDto.addressDetail,
                        phone: updateShelterDto.phone,
                        operatingHours: updateShelterDto.operatingHours,
                        description: updateShelterDto.description,
                        imgBanner: uploadedImgBanner,
                    },
                });

                // 기존 이미지 삭제
                if (toDelete.length > 0) {
                    await tx.shelterImage.deleteMany({
                        where: { id: { in: toDelete.map((img) => img.id) } },
                    });
                }

                // 신규 이미지 생성
                if (uploadedImgShelter.length > 0) {
                    await tx.shelterImage.createMany({ 
                        data: uploadedImgShelter.map((img) => ({
                            shelterId: shelter.id,
                            id: getImageIdByString(img),
                            img: img,
                        })),
                    });
                }

                return { shelter };
            });
        } catch (error) {
            // DB 실패 시 업로드했던 Blob 파일 삭제
            const toDeleteBanner = uploadedImgBanner && !isDefaultBanner(uploadedImgBanner) ? uploadedImgBanner : "";
            await this.sheltersUploadService.rollback(toDeleteBanner, uploadedImgShelter);

            throw error;
        }

        // 3. Azure Blob 삭제
        if (oldImgBanner) {
            await this.sheltersUploadService.deleteBlob(oldImgBanner);
        }
        if (toDelete.length > 0) {
            await this.sheltersUploadService.deleteBlobs(toDelete.map((img) => img.img));
        }

        return { shelterId: shelter.id };
    }
}
