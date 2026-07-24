import { PrismaService } from '@/prisma/prisma.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AnimalCardDto, GetAnimalsQueryDto, GetAnimalsResponseDto } from './dto/get-animals.dto';
import { Prisma } from '@prisma/client';
import { AnimalDetailResponseDto } from './dto/get-animals-detail.dto';
import { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { CreateAnimalDto } from './dto/create-animals.dto';
import { AzureBlobService } from '@/azure/azure-blob/azure-blob.service';
import { UPLOAD_DIR } from '@/config/upload.config';
import { error } from 'console';


// 보호동물 목록 한 페이지당 조회 개수
export const PAGE_SIZE = 12;

// 보호 동물 나이 필터
export enum AnimalAgeFilter {
    UNDER_6_MONTHS = 1,        // 0 ~ 6개월
    SIX_MONTHS_TO_ONE_YEAR,    // 6개월 ~ 1년
    ONE_TO_SEVEN_YEARS,        // 1 ~ 7세
    OVER_SEVEN_YEARS,          // 7세 이상
    UNKNOWN,                   // 확인 불가
}

@Injectable()
export class AnimalsService {
    constructor(private readonly prisma: PrismaService,
        private readonly azureBlob: AzureBlobService) { };

    // PATCH /animals/:id
    // PATCH /animals/:id/status
    // DELETE /animals/:id
    // status: animal.animalStatus


    // 썸네일 이미지 업로드
    private async uploadThumbnail(file:Express.Multer.File){
        if(!file) throw new BadRequestException("썸네일은 필수입니다");

        return this.azureBlob.uploadPublic(
            file,
            UPLOAD_DIR.animalThumbnailDir );
    }

    // 동물 이미지들 업로드
    async uploadImage(files: Express.Multer.File[]) {
        // 이미지 없으면 예외처리(최소1장 이상)
        if (!files || files.length == 0) {
            throw new BadRequestException("동물 이미지는 필수 1장이상입니다");
        }
        // 애저 blob 스토리지에 이미지 업로드
        return this.azureBlob.uploadPublicMultiple(
            files, UPLOAD_DIR.animalImgDir,
        );
    }

    // 보호동물 등록
    // POST /animals
    async create(auth: AuthRequest, createAnimalDto: CreateAnimalDto,
        files: {
            imgThumbnail: Express.Multer.File;
            images: Express.Multer.File[];
        },
    ) {
        // 보호소 관리자 조회
        const shelterId = auth.shelterId;

        // shelterId 확인
        if (!shelterId) {
            throw new BadRequestException("보호소 관리자만 등록할 수 있습니다.");
        }

        // azure 업로드
        // 썸네일 업로드
        const thumbnail = await this.uploadThumbnail(files.imgThumbnail);
        // 상세 이미지들 업로드
        const images = await this.uploadImage(files.images);

        // Azure 업로드 실패 시 롤백 되게 try 처리
        try {
            // DB 트랜잭션(Transaction), Animal / Detail / Image 동시 생성
            return this.prisma.$transaction(async (tx) => {
                // Animal 생성
                const animal = await this.createAnimal(
                    tx,
                    shelterId,
                    createAnimalDto,
                    thumbnail.blobName,
                );

                // AnimalDetail 생성
                await this.createAnimalDetail(tx, animal.id, createAnimalDto);

                // AnimalImage 생성
                await this.createAnimalImages(tx, animal.id, images.map(img => img.blobName));

                return {
                    success: true,
                    animalId: animal.id,
                };
            });
        } catch (error) {
            // DB실패 - Azure 파일 삭제
            // 썸네일 삭제
            await this.azureBlob.deleteBlob(thumbnail.blobName);
            // 상세 이미지들 삭제
            await Promise.all(
                images.map(img => this.azureBlob.deleteBlob(img.blobName))
            );
            throw error;
        }
    }

    // 애니멀 생성
    private async createAnimal(tx: Prisma.TransactionClient, shelterId: string,
        createAnimalDto: CreateAnimalDto, thumbnail: string) {
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
            },
            select: { id: true }
        });
    }

    // 애니멀 상세 생성
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

    // 애니멀 이미지 생성
    private async createAnimalImages(tx: Prisma.TransactionClient,
        animalId: number, images: string[]) {
        if (images.length === 0) return;

        return await tx.animalImage.createMany({
            data: images.map((img) => ({
                animalId,
                img,
            }))
        });
    }

    // 보호동물 목록 조회
    // GET /animals (페이지네이션 + 검색 + 필터)
    async getAnimals(query: GetAnimalsQueryDto): Promise<GetAnimalsResponseDto> {

        //(페이지네이션) 현재 Page 계산
        const page = query.page ?? 1;
        const skip = (page - 1) * PAGE_SIZE;
        const take = PAGE_SIZE;

        // 조회조건
        const where: Prisma.AnimalWhereInput = {};

        /**
         * 검색 조건
         */
        // keyword 검색(보호동물 이름 또는 보호소 이름 검색)
        if (query.keyword) {
            where.OR = [{
                name: { contains: query.keyword, mode: "insensitive" },
            },
            {
                shelter: {
                    name: { contains: query.keyword, mode: "insensitive" },
                },
            },
            ];
        }

        /**
         * 필터 조건
         */
        // species 동물종류
        if (query.species) {
            where.species = query.species;
        }
        // breed 픔종
        if (query.breed) {
            where.breed = query.breed;
        }
        // gender 성별
        if (query.gender) {
            where.gender = query.gender;
        }
        // 중성화 여부
        if (query.isNeutered !== undefined) {
            where.isNeutered = query.isNeutered;
        }
        // status 보호 상태
        if (query.status) {
            where.animalStatus = query.status;
        }
        // ageFilter 나이 필터
        switch (query.ageFilter) {
            // 0 ~ 6개월
            case AnimalAgeFilter.UNDER_6_MONTHS:
                where.age = { gte: 0, lte: 6 };
                break;
            // 6개월 ~ 12개월
            case AnimalAgeFilter.SIX_MONTHS_TO_ONE_YEAR:
                where.age = { gt: 6, lte: 12 };
                break;
            // 1세~ 7세
            case AnimalAgeFilter.ONE_TO_SEVEN_YEARS:
                where.age = { gt: 12, lte: 84 };
                break;
            // 7세 이상
            case AnimalAgeFilter.OVER_SEVEN_YEARS:
                where.age = { gt: 84 };
                break;
            // 확인 불가
            case AnimalAgeFilter.UNKNOWN:
                // Todo: 확인 불가 저장 방식 논의 필요
                where.isEstimatedAge = true;
                break;
        }

        /**
         * 보호동물 목록 및 전체 개수 조회
         */
        const [animals, totalCount] = await Promise.all([
            this.prisma.animal.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' },
                include: {
                    shelter: true,
                    animalSpecies: true,
                    animalBreed: true
                },
            }),
            this.prisma.animal.count({
                where,
            })
        ]);

        // (동물카드) 응답 DTO변환
        const items: AnimalCardDto[] = animals.map((animal) => ({
            id: animal.id,
            imgThumbnail: animal.imgThumbnail,
            status: animal.animalStatus,
            species: animal.animalSpecies.name,
            breed: animal.animalBreed.name,
            name: animal.name,
            gender: animal.gender,
            isNeutered: animal.isNeutered,
            age: animal.age,
            isEstimatedAge: animal.isEstimatedAge,
            weight: Number(animal.weight),
            shelterName: animal.shelter.name,
            createdAt: animal.createdAt,
        }));
        // 전체 페이지 수
        const totalPages = Math.ceil(totalCount / PAGE_SIZE);

        /**
         * 페이지네이션 벙보와 함께 반환
         */
        return {
            items,
            page,
            totalPages,
            totalCount,
        };
    }

    // 보호동물 상세 조회
    // GET /animals/:id
    async findOne(id: number): Promise<AnimalDetailResponseDto> {
        // 조회
        const animal = await this.prisma.animal.findUnique({
            where: { id },
            include: {
                shelter: true,
                animalSpecies: true,
                animalBreed: true,
                images: true,
                detail: true,
            }
        });
        // 동물이 없으면 처리
        if (!animal) throw new NotFoundException('보호동물을 찾을 수 없습니다');
        // 동물 상세정보 없으면 처리
        if (!animal.detail) throw new NotFoundException("보호동물 상세 정보가 없습니다.");

        return {
            id: animal.id,
            shelterId: animal.shelter.id,     // 보호소 아이디
            shelterName: animal.shelter.name, // 보호소 이름
            thumbnail: animal.imgThumbnail,      //보호소 썸네일 이미지
            images: animal.images.map(image => image.img), // 보호소 이미지들
            name: animal.name,      // 보호동물 이름
            gender: animal.gender,  // 성별
            isNeutered: animal.isNeutered,   // 중성화
            species: animal.animalSpecies.name, // 동물종류 이름
            breed: animal.animalBreed.name,  // 품종
            age: animal.age,                 // 나이
            isEstimatedAge: animal.isEstimatedAge,  //나이 추정
            weight: Number(animal.weight),   // 몸무게
            noticeStartDate: animal.detail?.noticeStartDate,    // 공고기간-시작일
            noticeEndDate: animal.detail?.noticeEndDate,    // 공고기간-마감일
            animalStatus: animal.animalStatus,      // 보호동물상태
            foundLocation: animal.detail?.foundLocation,    // 발견장소
            specialNotes: animal.detail?.specialNotes,      // 특이사항
            description: animal.detail?.description,        // 소개말
            healthStatus: animal.detail?.healthStatus,      // 건강상태
        };
    }
}




// async create(auth: AuthRequest, createAnimalDto: CreateAnimalDto,
//     files: {
//         imgThumbnail: Express.Multer.File;
//         images: Express.Multer.File[];
//     },
// ) {
//     // 보호소 관리자 조회
//     const shelterId = auth.shelterId;

//     // shelterId 확인
//     if (!shelterId) {
//         throw new BadRequestException("보호소 관리자만 등록할 수 있습니다.");
//     }

//     // azure 업로드
//     // 썸네일 업로드
//     if (!files.imgThumbnail) {
//         throw new BadRequestException("썸네일 이미지는 필수입니다");
//     }
//     const thumbnail = await this.azureBlob.uploadPublic(
//         files.imgThumbnail,
//         UPLOAD_DIR.animalThumbnailDir,
//     );

//     // 상세 이미지들 업로드
//     const images = await this.uploadImage(files.images);

//     // const images = await Promise.all(
//     //     (files.images ?? []).map(file =>
//     //         this.azureBlob.uploadPublic(file, UPLOAD_DIR.animalImgDir),
//     //     )
//     // );

//     // Multipart 처리 controller 에서 @ApiConsumes('multipart/form-data')

//     // Azure 업로드 실패 시 롤백 되게 try 처리
//     try{
//         // DB 트랜잭션(Transaction)
//     return await this.prisma.$transaction(async (tx) => {
//         // Animal / Detail / Image 동시 생성
//         // Animal 생성
//         const animal = await tx.animal.create({
//             data: {
//                 shelterId,
//                 name: createAnimalDto.name,
//                 species: createAnimalDto.species,
//                 breed: createAnimalDto.breed,
//                 gender: createAnimalDto.gender,
//                 isNeutered: createAnimalDto.isNeutered,

//                 age: createAnimalDto.age,
//                 isEstimatedAge: createAnimalDto.isEstimatedAge,

//                 weight: createAnimalDto.weight,
//                 imgThumbnail: thumbnail.blobName,
//             },
//             select:{
//                 id:true,
//             }
//         });

//         // AnimalDetail 생성
//         await tx.animalDetail.create({
//             data: {
//                 animalId: animal.id,

//                 noticeStartDate: createAnimalDto.noticeStartDate,
//                 noticeEndDate: createAnimalDto.noticeEndDate,

//                 foundLocation: createAnimalDto.foundLocation,
//                 specialNotes: createAnimalDto.specialNotes,
//                 description: createAnimalDto.description,
//                 healthStatus: createAnimalDto.healthStatus,
//             },
//         });

//         // AnimalImage createMany
//         if (images.length > 0) {
//             await tx.animalImage.createMany({
//                 data: images.map((img) => ({
//                     animalId: animal.id,
//                     img: img.blobName,
//                 })),
//             });
//         }

//         return {
//             success: true,
//             animalId: animal.id,
//         };
//     });
//     }
//     catch (error) {
//         // DB실패 - Azure 파일 삭제
//         // 썸네일 삭제
//         await this.azureBlob.deleteBlob(thumbnail.blobName);
//         // 상세 이미지들 삭제
//         await Promise.all(
//             images.map(img => this.azureBlob.deleteBlob(img.blobName))
//         );
//     }
//     throw error;
// }