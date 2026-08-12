import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AnimalGender, AnimalStatus } from '@prisma/client';
import { buildAnimalWhere } from '@/animals/animals.where';
import { SHELTERS_SELECT } from '@/shelters/shelter.select';
import { toAnimalCardDto } from '@/animals/animals.mapper';

@Injectable()
export class AiToolsService {
    constructor(private readonly prisma: PrismaService) {}

    // 이름 기반으로 실제 tool 함수를 실행 (아키텍처 무관하게 재사용)
    async executeTool(name: string, args: Record<string, any>): Promise<unknown> {
        switch (name) {
            case 'findAnimals':
                return this.findAnimals(args as any);
            case 'findShelters':
                return this.findShelters(args as any);
            default:
                return { error: `알 수 없는 tool입니다: ${name}` };
        }
    }

    // 보호동물 동물 검색
    async findAnimals({
        keyword, 
        speciesName, 
        breedName, 
        gender, 
        isNeutered, 
        ageFilter, 
        status,
    }: {
        keyword?: string;
        speciesName?: string;
        breedName?: string;
        gender?: AnimalGender;
        isNeutered?: boolean;
        ageFilter?: number;
        status?: AnimalStatus;
    }) {
        
        const breed = breedName ? await this.prisma.animalBreed.findFirst({ where: { name: breedName } }) : null;
        const species = speciesName ? await this.prisma.animalSpecies.findFirst({ where: { name: speciesName } }) : null;

        const where = buildAnimalWhere({
            keyword, 
            species: species?.id, 
            breed: breed?.id, 
            gender, 
            isNeutered, 
            ageFilter, 
            status, 
            limit: 0, 
            page: 0,
        });

        const animals = await this.prisma.animal.findMany({ 
            where, 
            include:{
                shelter: true,
                animalSpecies: true,
                animalBreed: true
            },
            orderBy: { createdAt: 'desc' },
            take: 10,
        });

        return animals.map(toAnimalCardDto);
    }

    // 보호소 검색
    async findShelters({ 
        keyword 
    }: { 
        keyword: string 
    }) {
        return this.prisma.shelter.findMany({
            where: {
                OR: [
                    { name: { contains: keyword, mode: 'insensitive' } },
                    { description: { contains: keyword, mode: 'insensitive' } },
                    { address: { contains: keyword, mode: 'insensitive' } },
                    { addressDetail: { contains: keyword, mode: 'insensitive' } },
                ],
            },
            select: SHELTERS_SELECT,
            take: 10,
            orderBy: { createdAt: 'desc' },
        });
    }
}