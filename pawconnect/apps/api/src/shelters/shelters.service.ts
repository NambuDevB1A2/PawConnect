import { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { AzureBlobService } from '@/azure/azure-blob/azure-blob.service';
import { getImageIdByString } from '@/common/utils/upload.util';
import { UPLOAD_DIR } from '@/config/upload.config';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateShelterDto } from '@/shelters/dto/create-shelter.dto';
import { UpdateShelterDto } from '@/shelters/dto/update-shelter.dto';
import { SHELTER_IMAGE_SELECT, SHELTER_SELECT } from '@/shelters/shelter.select';
import { UsersService } from '@/users/users.service';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

function getDefaultBanner() {
    return `${UPLOAD_DIR.shelterBannerDir}/default_banner.png`;
}

function isDefaultBanner(blobName: string) {
    return blobName === getDefaultBanner();
}

@Injectable()
export class SheltersService {
    constructor (
        private readonly prisma: PrismaService,
        private readonly azureBlob: AzureBlobService,
        private readonly usersService: UsersService
    ) {}
    
    // 보호소 검색 (id)
    async find(id: string, select?: Prisma.ShelterSelect) {
        const shelter = await this.prisma.shelter.findUnique({ where: { id }, select: select});
        if (!shelter) throw new UnauthorizedException({
            message: "존재하지 않는 보호소입니다",
        });
        
        return shelter;
    }

    // 보호소 이미지 검색
    async findImages(id: string) {
        const images = await this.prisma.shelterImage.findMany({ where: { shelterId: id }});
        return images;
    }

    // 보호소 중복 검사 (이름)
    async existsByName(name: string) {
        const shelter = await this.prisma.shelter.findUnique({ where: { name }});
        if (shelter) throw new UnauthorizedException({
            message: "이미 사용중인 보호소 이름입니다",
            fields: { name: "이미 사용중인 보호소 이름입니다" },
        });
    }

    // CREATE

    // 보호소 생성
    async create(tx: Prisma.TransactionClient, createShelterDto: CreateShelterDto, imgBanner?: Express.Multer.File) {
        await this.existsByName(createShelterDto.name);

        // blob 스토리지에 이미지 업로드
        const { blobName, url } = imgBanner ? 
            await this.azureBlob.uploadPublic(imgBanner, UPLOAD_DIR.shelterBannerDir) : { blobName: getDefaultBanner() };

        const shelter = await tx.shelter.create({
            data: {
                name: createShelterDto.name,
                address: createShelterDto.address,
                addressDetail: createShelterDto.addressDetail,
                phone: createShelterDto.phone,
                operatingHours: createShelterDto.operatingHours,
                description: createShelterDto.description,
                imgBanner: blobName,
            },
            select: SHELTER_SELECT,
        });

        return shelter;
    }
    
    async uploadImages(files?: Express.Multer.File[]) {
        if (!files || files.length === 0) return [];

        // blob 스토리지에 이미지 업로드
        return await this.azureBlob.uploadPublicMultiple(files, UPLOAD_DIR.shelterImgDir);
    }

    // 이미지 새로 저장
    async createImages(tx: Prisma.TransactionClient, shelterId: string, images: string[]) {
        // Promise.all로 한 번에 실행
        return Promise.all(images.map((img) => 
            tx.shelterImage.create({
                data: {
                    id: getImageIdByString(img),
                    img: img,
                    shelterId: shelterId,
                },
                select: SHELTER_IMAGE_SELECT,
            })
        ));
    }

    // READ
    // 내 보호소 정보 조회
    async me(auth: AuthRequest) {
        const user = await this.usersService.find(auth.id);
        if (!user.shelterId) throw new NotFoundException();

        const shelter = await this.find(user.shelterId);

        return { success: true, shelter };
    }

    // UPDATE
    // 내 보호소 정보 수정
    async update(auth: AuthRequest, updateShelterDto: UpdateShelterDto, imgBanner?: Express.Multer.File, imgShelter?: Express.Multer.File[]) {
        const user = await this.usersService.find(auth.id);
        const shelterId = user.shelterId;
        if (!shelterId) throw new NotFoundException();

        const prevShelter = await this.find(shelterId);
        const prevShelterImages = await this.findImages(shelterId);
        const keepSet = new Set(updateShelterDto.imgShelterKeeps ?? []);
        const toDelete = prevShelterImages.filter(img => !keepSet.has(img.img));

        let imgBannerPath = prevShelter.imgBanner;
        let imgBannerOld: string | null = null;

        // 1. 새로운 파일 업로드
        // 새로운 이미지로 교체
        if (imgBanner) {
            const uploadedImgBanner = await this.azureBlob.uploadPublic(imgBanner, UPLOAD_DIR.shelterBannerDir);
            imgBannerPath = uploadedImgBanner.blobName;
            if (!isDefaultBanner(prevShelter.imgBanner)) {
                imgBannerOld = prevShelter.imgBanner;
            }
        } 
        // 기존 이미지 제거
        else if (updateShelterDto.imgBannerRemoved && !isDefaultBanner(prevShelter.imgBanner)) {
            imgBannerOld = prevShelter.imgBanner;
            imgBannerPath = getDefaultBanner();
        }

        const uploadedImgShelter = await this.uploadImages(imgShelter);

        // 2. 트랜잭션으로 진행 도중 오류 발생시 DB 작업 무효화
        const result = await this.prisma.$transaction(async (tx) => {
            // 보호소 업데이트
            const shelter = await tx.shelter.update({
                where: { id: shelterId },
                data: {
                    name: updateShelterDto.name,
                    address: updateShelterDto.address,
                    addressDetail: updateShelterDto.addressDetail,
                    phone: updateShelterDto.phone,
                    operatingHours: updateShelterDto.operatingHours,
                    description: updateShelterDto.description,
                    imgBanner: imgBannerPath,
                },
            });

            // 보호소 이미지 업데이트
            await tx.shelterImage.deleteMany({ where: { id: { in: toDelete.map(img => img.id)}} });
            const shelterImages = await this.createImages(tx, shelterId, uploadedImgShelter.map((img) => img.blobName));

            return { shelter, shelterImages };
        });

        // 3. 트랜잭션 성공 후에 실제 파일 삭제
        if (imgBannerOld) await this.azureBlob.deleteBlob(imgBannerOld);
        // 유지 목록에 없는 기존 이미지 전부 삭제
        await Promise.all(toDelete.map(img => this.azureBlob.deleteBlob(img.img)));

        return { success: true, ...result };
    }

    // DELETE
    
}
