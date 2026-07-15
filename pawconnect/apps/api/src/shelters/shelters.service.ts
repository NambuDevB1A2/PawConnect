import { PrismaService } from '@/prisma/prisma.service';
import { CraeteShelterDto } from '@/shelters/dto/create-shelter.dto';
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
    async create(tx: Prisma.TransactionClient, createShelterDto: CraeteShelterDto) {
        await this.existsByName(createShelterDto.name);

        const shelter = await tx.shelter.create({
            data: {
                name: createShelterDto.name,
                adress: createShelterDto.adress,
                adressDetail: createShelterDto.adressDetail,
                phone: createShelterDto.phone,
                operatingHours: createShelterDto.operatingHours,
                description: createShelterDto.description,
                imgBanner: createShelterDto.imgBanner,
            },
            select: SHELTER_SELECT,
        });

        return shelter;
    }
}
