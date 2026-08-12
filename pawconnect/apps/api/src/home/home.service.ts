import { toAnimalCardDto } from '@/animals/animals.mapper';
import { PrismaService } from '@/prisma/prisma.service';
import { SHELTER_ORDERBY, SHELTERS_SELECT } from '@/shelters/shelter.select';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HomeService {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    // 홈 화면 필요 정보 조회
    async getHome() {

        const [animals, shelter] = await Promise.all([
            this.prisma.animal.findMany({
                include:{
                    shelter: true,
                    animalSpecies: true,
                    animalBreed: true
                },
                orderBy: { createdAt: "desc" },
                take: 3,
            }),
            
            this.prisma.shelter.findFirst({
                orderBy: SHELTER_ORDERBY.NEWEST,
                take: 1,
                select: SHELTERS_SELECT,
            }),
        ]);

        return { success: true, animals: animals.map(toAnimalCardDto), shelter };
    }
}
