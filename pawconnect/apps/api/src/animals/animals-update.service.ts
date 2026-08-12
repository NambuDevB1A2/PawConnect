import { AuthRequest } from "@/auth/interfaces/auth-request.interface";
import { PrismaService } from "@/prisma/prisma.service";
import { ForbiddenException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { UpdateAnimalDto } from "./dto/update-animals.dto";
import { AnimalUploadService } from "./animal-upload.service";
import { AnimalStatus, Prisma } from "@prisma/client";


@Injectable()
export class AnimalsUpdateService {
    private readonly logger = new Logger(AnimalsUpdateService.name)

    constructor(
        private readonly prisma: PrismaService,
        private readonly uploadService: AnimalUploadService) { }

    // 수정 권한 확인
    private async checkShelter(auth: AuthRequest, id: number) {
        //1. 수정할 동물 조회
        const animal = await this.prisma.animal.findUnique({
            where: { id },
            include: { images: true }
        });

        //2. 존재하지 않는 동물인지 확인
        if (!animal) {
            throw new NotFoundException("해당 동물이 없습니다");
        }
        //3. 등록된 동물의 보호소가 같은지 확인
        if (animal.shelterId !== auth.shelterId) {
            throw new ForbiddenException("수정 권한이 없습니다");
        }
        return animal;
    }

    // 보호 동물 수정
    async update(auth: AuthRequest, animalId: number, dto: UpdateAnimalDto,
        files) {

        //1. 수정 권한 확인
        const currentAnimal = await this.checkShelter(auth, animalId);
        const oldThumbnail = currentAnimal.imgThumbnail;
        const deletedImages = Array.isArray(dto.deletedImages)
            ? dto.deletedImages : dto.deletedImages
                ? [dto.deletedImages] : [];

        // 이미지 선언
        let thumbnail;
        let images;
        
        //2. Azure Blob에 썸네일 업로드(있는 경우만)
        if (files?.imgThumbnail?.length) {
            thumbnail = await this.uploadService.uploadThumbnail(
                files.imgThumbnail[0]);
        }

        //3. Azure Blob에 상세 이미지들 업로드(있는 경우만)
        if (files?.images?.length) {
            images = await this.uploadService.uploadImages(files.images);
        }

        // 새로 추가된 이미지 등록
        const newImageNames = images ? 
            images.map(img => img.blobName) : [];


        try {
            const result = await this.prisma.$transaction(async (tx) => {
                // Animal 수정(보호동물 기본 정보)
                await this.updateAnimal(tx, animalId, dto, thumbnail?.blobName);
                // AnimalDetail 수정
                await this.updateAnimalDetail(tx, animalId, dto);
                // AnimalImage 수정(이미지 변경시만)
                // 삭제요청된 기존이미지는 제거, 새로 추가된 이미지는 등록
                await this.updateAnimalImages(
                    tx,
                    animalId,
                    newImageNames,
                    deletedImages,
                );

                // 반환
                return {
                    success: true,
                    animalId,
                };
            });

            // 기존 Blob 삭제
            try {
                // 기존 썸네일 삭제
                if (thumbnail) {
                    await this.uploadService.deleteBlob(oldThumbnail);
                }
                // 삭제 요청된 이미지만 Blob 삭제
                if (deletedImages.length > 0) {
                    await this.uploadService.deleteBlobs(deletedImages);
                }
            } catch (error) {
                this.logger.warn("기존 Blob 삭제 실패", error);
            }
            return result;
        } catch (error) {
            // 새로 업로드한 Blob 롤백
            await this.uploadService.rollback(thumbnail, images ?? []);

            throw error;
        }
    }

    // 동물상태 수정
    async updateState(auth: AuthRequest, id: number, status: AnimalStatus) {
        // 수정 권한 확인
        await this.checkShelter(auth, id);

        //동물 상태 변경
        return this.prisma.animal.update({
            where: { id },
            data: { animalStatus: status }
        });
    };

    // 삭제
    async remove(auth: AuthRequest, id: number) {
        // 수정 권한 확인
        const animal = await this.checkShelter(auth, id);

        // 삭제
        await this.prisma.animal.delete({
            where: { id }
        });

        // blob의 이미지 삭제
        try {
            await this.uploadService.deleteBlob(animal.imgThumbnail);
            await this.uploadService.deleteBlobs(
                animal.images.map(img => img.img));
        } catch (error) {
            this.logger.warn('이미지 삭제 실패', error);
        }

        // 삭제시 아이디만 반환
        return { success: true, animalId: id };
    }

    // 동물 수정
    private async updateAnimal(
        tx: Prisma.TransactionClient,
        id: number,
        dto: UpdateAnimalDto,
        thumbnail?: string,
    ) {
        const data: Prisma.AnimalUpdateInput = {
            ...(dto.name !== undefined && { name: dto.name }),
            ...(dto.species !== undefined && { species: dto.species }),
            ...(dto.breed !== undefined && { breed: dto.breed }),
            ...(dto.gender !== undefined && { gender: dto.gender }),
            ...(dto.isNeutered !== undefined && { isNeutered: dto.isNeutered }),

            ...(dto.age !== undefined && { age: dto.age }),
            ...(dto.isEstimatedAge !== undefined && { isEstimatedAge: dto.isEstimatedAge }),

            ...(dto.weight !== undefined && { weight: dto.weight }),
            ...(dto.animalStatus !== undefined && { animalStatus: dto.animalStatus }),
        };
        // 새 썸네일이 올라온 경우에만 교체
        if (thumbnail) {
            data.imgThumbnail = thumbnail;
        }

        return tx.animal.update({
            where: { id },
            data,
        });
    }

    // 동물 상세 수정
    private async updateAnimalDetail(
        tx: Prisma.TransactionClient,
        animalId: number,
        dto: UpdateAnimalDto
    ) {
        return tx.animalDetail.update({
            where: { animalId },
            data: {
                ...(dto.noticeStartDate !== undefined && {
                    noticeStartDate: dto.noticeStartDate
                }),
                ...(dto.noticeEndDate !== undefined && {
                    noticeEndDate: dto.noticeEndDate
                }),
                ...(dto.foundLocation !== undefined && {
                    foundLocation: dto.foundLocation
                }),
                ...(dto.specialNotes !== undefined && {
                    specialNotes: dto.specialNotes
                }),
                ...(dto.description !== undefined && {
                    description: dto.description
                }),
                ...(dto.healthStatus !== undefined && {
                    healthStatus: dto.healthStatus
                }),
            },
        });
    }

    // 동물 이미지 수정
    // 기존 이미지를 모두 삭제한 후 새 이미지로 교체
    private async updateAnimalImages(
        tx: Prisma.TransactionClient,
        animalId: number,
        newImages: string[],
        deleteImages: string[]
    ) {
        // if (!images.length) return;

        // 삭제할 기존이미지 제거
        if (deleteImages.length) {
            await tx.animalImage.deleteMany({
                where: {
                    animalId,
                    img: { in: deleteImages }
                }
            });
        }


        // 새 이미지 등록
        if (newImages.length) {
            await tx.animalImage.createMany({
                data: newImages.map(img => ({ animalId, img }))
            });
        }
    }
}