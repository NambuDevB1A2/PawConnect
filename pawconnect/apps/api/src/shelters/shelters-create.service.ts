import { getImageIdByString } from '@/common/utils/upload.util';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateShelterDto } from '@/shelters/dto/create-shelter.dto';
import { getDefaultBanner, isDefaultBanner, SheltersReadService } from '@/shelters/shelters-read.service';
import { SheltersUploadService } from '@/shelters/shelters-upload.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class SheltersCreateService {
    constructor (
        private readonly prisma: PrismaService,
        private readonly sheltersReadService: SheltersReadService,
        private readonly sheltersUploadService: SheltersUploadService,
    ) {}

    // 중복 검사
    async checkShelter(name: string) {
        await this.sheltersReadService.existsByName(name);
    }

    // 이미지 업로드
    async createImages(imgBannerFile?: Express.Multer.File, imgShelterFiles?: Express.Multer.File[]) {
        // 1. Azure Blob에 이미지 업로드 (없을시 기본값)
        let uploadedImgBanner = imgBannerFile ? await this.sheltersUploadService.uploadBanner(imgBannerFile) : undefined;
        if (!uploadedImgBanner) uploadedImgBanner = getDefaultBanner();

        let uploadedImgShelter = imgShelterFiles ?  await this.sheltersUploadService.uploadImages(imgShelterFiles) : [];
        if (!uploadedImgShelter) uploadedImgShelter = [];

        return { uploadedImgBanner, uploadedImgShelter };
    }
    
    // 보호소 생성
    async createShelter(tx: Prisma.TransactionClient, createShelterDto: CreateShelterDto, 
        uploadedImgBanner: string, uploadedImgShelter: string[]) {

        // 2. DB 작업
        // 신규 보호소 DB 생성
        const shelter = await tx.shelter.create({
            data: {
                name: createShelterDto.name,
                address: createShelterDto.address,
                addressDetail: createShelterDto.addressDetail,
                phone: createShelterDto.phone,
                operatingHours: createShelterDto.operatingHours,
                description: createShelterDto.description,
                imgBanner: uploadedImgBanner,
            },
        });

        // 보호소 이미지 DB 생성
        await tx.shelterImage.createMany({
            data: uploadedImgShelter.map((img) => ({
                shelterId: shelter.id,
                id: getImageIdByString(img),
                img: img,  
            })),
        });
        
        return shelter;
    }

    async rollbackImages(uploadedImgBanner: string, uploadedImgShelter: string[]) {
        if (isDefaultBanner(uploadedImgBanner)) {
            await this.sheltersUploadService.rollback("", uploadedImgShelter);
        }
        else {
            await this.sheltersUploadService.rollback(uploadedImgBanner, uploadedImgShelter);
        }
    }
}
