import { UPLOAD_DIR } from '@/config/upload.config';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateShelterDto } from '@/shelters/dto/create-shelter.dto';
import { SHELTER_SELECT } from '@/shelters/shelter.select';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class SheltersService {
    constructor (private readonly prisma: PrismaService) {}
    
    // 보호소 검색 (id)
    async find(id: string) {
        const shelter = await this.prisma.shelter.findUnique({ where: { id }});
        if (!shelter) throw new UnauthorizedException();
        
        return shelter;
    }

    // 보호소 중복 검사 (이름)
    async existsByName(name: string) {
        const shelter = await this.prisma.shelter.findUnique({ where: { name }});
        if (shelter) throw new UnauthorizedException();
    }

    // CREATE
    async create(tx: Prisma.TransactionClient, createShelterDto: CreateShelterDto, imgBanner?: Express.Multer.File) {
        await this.existsByName(createShelterDto.name);

        // 파일 path 저장 (기본값 설정 로직)
        const imgBannerPath = imgBanner ? imgBanner.path : `${UPLOAD_DIR.shelterBannerDir}/default_banner.png`;

        const shelter = await tx.shelter.create({
            data: {
                name: createShelterDto.name,
                address: createShelterDto.address,
                addressDetail: createShelterDto.addressDetail,
                phone: createShelterDto.phone,
                operatingHours: createShelterDto.operatingHours,
                description: createShelterDto.description,
                imgBanner: imgBannerPath,
            },
            select: SHELTER_SELECT,
        });

        return shelter;
    }
}
