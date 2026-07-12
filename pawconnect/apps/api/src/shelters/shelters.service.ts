import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CraeteShelterDto } from './dto/create-shelter.dto';
import { SHELTER_SELECT } from './shelter.select';
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

    // CREATE
    async create(tx: Prisma.TransactionClient, createShelterDto: CraeteShelterDto) {
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
