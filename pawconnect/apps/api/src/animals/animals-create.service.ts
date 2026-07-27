import { PrismaService } from "@/prisma/prisma.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { AnimalUploadService } from "./animal-upload.service";
import { AuthRequest } from "@/auth/interfaces/auth-request.interface";
import { CreateAnimalDto } from "./dto/create-animals.dto";
import { Prisma } from "@prisma/client";
import { AnimalUploadFiles } from "./animals.type";


@Injectable()
export class AnimalsCreateService {
    constructor(private readonly prisma: PrismaService,
        private readonly uploadService: AnimalUploadService) { };

    // 보호동물 등록
    async create(auth: AuthRequest, createAnimalDto: CreateAnimalDto,
        files:AnimalUploadFiles) {
        // 보호소 관리자 여부 확인
        const shelterId = auth.shelterId;
        if (!shelterId) throw new BadRequestException("보호소 관리자만 등록할 수 있습니다");

        // Azure Blob에 썸네일 업로드
        const thumbnail = await this.uploadService.uploadThumbnail(
            files.imgThumbnail[0]);
        // Azure Blob에 상세 이미지들 업로드
        const images = await this.uploadService.uploadImages(files.images);

        try {
            // DB 작업은 하나의 트랜잭션으로 처리
            return await this.prisma.$transaction(async (tx) => {
                // Animal 생성(보호동물 기본 정보)
                const animal = await this.createAnimal(
                    tx,
                    shelterId,
                    createAnimalDto,
                    thumbnail.blobName
                );

                // AnimalDetail 생성(보호동물 상세 정보)
                await this.createAnimalDetail(
                    tx, 
                    animal.id, 
                    createAnimalDto);

                // AnimalImage 생성(보호동물 이미지들 저장)
                await this.createAnimalImages(
                    tx, 
                    animal.id, 
                    images.map(img => img.blobName));

                return {
                    success: true,
                    animalId: animal.id,
                };
            });
        } catch (error) {
            // DB 실패 시 업로드했던 Blob 파일 삭제
            await this.uploadService.rollback(thumbnail, images);

            throw error;
        };

    }

    // animal 생성
    private async createAnimal(tx: Prisma.TransactionClient,
        shelterId: string, createAnimalDto: CreateAnimalDto,
        thumbnail: string) {
        return await tx.animal.create({
            data: {
                shelterId,
                name: createAnimalDto.name,
                species: createAnimalDto.species,
                breed: createAnimalDto.breed,
                gender: createAnimalDto.gender,
                isNeutered: createAnimalDto.isNeutered,

                age: createAnimalDto.age,
                isEstimatedAge: createAnimalDto.isEstimatedAge,

                weight: createAnimalDto.weight,
                imgThumbnail: thumbnail,

                animalStatus: createAnimalDto.animalStatus,
            },
            select: { id: true }
        });
    }

    // animal 상세 생성
    private async createAnimalDetail(tx: Prisma.TransactionClient,
        animalId: number, createAnimalDto: CreateAnimalDto) {
        return await tx.animalDetail.create({
            data: {
                animalId,

                noticeStartDate: createAnimalDto.noticeStartDate,
                noticeEndDate: createAnimalDto.noticeEndDate,

                foundLocation: createAnimalDto.foundLocation,
                specialNotes: createAnimalDto.specialNotes,
                description: createAnimalDto.description,
                healthStatus: createAnimalDto.healthStatus,
            },
        });
    }

    // animal 이미지 생성
    private async createAnimalImages(tx: Prisma.TransactionClient,
        animalId: number, images: string[]) {
        if (images.length === 0) return;

        await tx.animalImage.createMany({
            data: images.map((img) => ({ animalId, img }))
        });
    }
}