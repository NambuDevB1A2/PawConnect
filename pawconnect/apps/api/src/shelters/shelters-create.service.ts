import { getImageIdByString } from '@/common/utils/upload.util';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateShelterDto } from '@/shelters/dto/create-shelter.dto';
import { getDefaultBanner, SheltersReadService } from '@/shelters/shelters-read.service';
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
    
    // 보호소 생성
    async create(tx: Prisma.TransactionClient, createShelterDto: CreateShelterDto, 
        imgBannerFile?: Express.Multer.File, imgShelterFiles?: Express.Multer.File[]) {
        await this.sheltersReadService.existsByName(createShelterDto.name);

        // 1. Azure Blob에 이미지 업로드 (없을시 기본값)
        let uploadedImgBanner = imgBannerFile ? await this.sheltersUploadService.uploadBanner(imgBannerFile) : undefined;
        if (!uploadedImgBanner) uploadedImgBanner = getDefaultBanner();

        let uploadedImgShelter = imgShelterFiles ?  await this.sheltersUploadService.uploadImages(imgShelterFiles) : [];
        if (!uploadedImgShelter) uploadedImgShelter = [];

        // 2. DB 작업
        try {
            // 신규 보호소 DB 생성
            const shelter = await this.createShelter(tx, createShelterDto, uploadedImgBanner);
            // 보호소 이미지 DB 생성
            await this.createImages(tx, shelter.id, uploadedImgShelter);
            
            return shelter;
        } catch (error) {
            // DB 실패 시 업로드했던 Blob 파일 삭제
            await this.sheltersUploadService.rollback(uploadedImgBanner, uploadedImgShelter);

            throw error;
        }
    }

    // 보호소 DB 생성
    async createShelter(tx: Prisma.TransactionClient, createShelterDto: CreateShelterDto, blobName: string) {
        return await tx.shelter.create({
            data: {
                name: createShelterDto.name,
                address: createShelterDto.address,
                addressDetail: createShelterDto.addressDetail,
                phone: createShelterDto.phone,
                operatingHours: createShelterDto.operatingHours,
                description: createShelterDto.description,
                imgBanner: blobName,
            },
        });
    }

    // 보호소 이미지 DB 생성
    async createImages(tx: Prisma.TransactionClient, shelterId: string, blobNames: string[]) {
        await tx.shelterImage.createMany({
            data: blobNames.map((img) => ({
                shelterId: shelterId,
                id: getImageIdByString(img),
                img: img,  
            })),
        });
    }
}
