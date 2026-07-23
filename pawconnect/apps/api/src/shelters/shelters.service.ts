import { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { AzureBlobService } from '@/azure/azure-blob/azure-blob.service';
import { getImageIdByString, removeFile, removeFiles } from '@/common/utils/upload.util';
import { UPLOAD_DIR } from '@/config/upload.config';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateShelterDto } from '@/shelters/dto/create-shelter.dto';
import { UpdateShelterDataDto, UpdateShelterDto } from '@/shelters/dto/update-shelter.dto';
import { SHELTER_IMAGE_SELECT, SHELTER_SELECT } from '@/shelters/shelter.select';
import { UsersService } from '@/users/users.service';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

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
        if (!shelter) throw new UnauthorizedException();
        
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
        if (shelter) throw new UnauthorizedException();
    }

    // CREATE

    // 보호소 생성
    async create(tx: Prisma.TransactionClient, createShelterDto: CreateShelterDto, imgBanner?: Express.Multer.File) {
        await this.existsByName(createShelterDto.name);

        // blob 스토리지에 이미지 업로드
        const { blobName, url } = imgBanner ? 
            await this.azureBlob.uploadPublic(imgBanner, UPLOAD_DIR.shelterBannerDir) : 
            { blobName: `${UPLOAD_DIR.shelterBannerDir}/default_banner.png`};

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

    // 이미지 새로 저장
    async createImages(tx: Prisma.TransactionClient, shelterId: string, files?: Express.Multer.File[]) {
        if (!files || files.length === 0) return;

        // blob 스토리지에 이미지 업로드
        const blobName = await this.azureBlob.uploadPublicMultiple(files, UPLOAD_DIR.shelterImgDir)

        // Promise.all로 한 번에 실행
        return Promise.all(blobName.map((blob) => 
            tx.shelterImage.create({
                data: {
                    id: getImageIdByString(blob.blobName),
                    img: blob.blobName,
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

        return { shelter };
    }

    // UPDATE
    // 내 보호소 정보 수정
    async update(auth: AuthRequest, updateShelterDto: UpdateShelterDto, imgBanner?: Express.Multer.File, imgShelter?: Express.Multer.File[]) {
        const user = await this.usersService.find(auth.id);
        const shelterId = user.shelterId;
        if (!shelterId) throw new NotFoundException();

        // 기존 보호소 정보 불러오기
        const prevShelter = await this.find(shelterId);
        const prevShelterImages = await this.findImages(shelterId);
        const updateData: UpdateShelterDataDto = {
            name: updateShelterDto.name,
            address: updateShelterDto.address,
            addressDetail: updateShelterDto.addressDetail,
            phone: updateShelterDto.phone,
            operatingHours: updateShelterDto.operatingHours,
            description: updateShelterDto.description,
            imgBanner: imgBanner ? imgBanner.path : prevShelter.imgBanner,
        }

        // 트랜잭션으로 진행 도중 오류 발생시 DB 작업 무효화
        const result = await this.prisma.$transaction(async (tx) => {
            // 보호소 업데이트
            const shelter = await tx.shelter.update({
                where: { id: shelterId },
                data: {
                    ...updateData,
                },
            });

            // 보호소 이미지 업데이트
            const shelterImages = await this.updateImages(tx, shelterId, imgShelter);

            return { shelter, shelterImages };
        });

        // TODO: blob 이미지 지우기
        // if (imgBanner) await removeFile(prevShelter.imgBanner);
        // if (imgShelter) await removeFiles(prevShelterImages.map((img) => img.img));

        return { result };
    }

    // 새 이미지로 업데이트
    async updateImages(tx: Prisma.TransactionClient, shelterId: string, files?: Express.Multer.File[]) {
        await this.removeImages(tx, shelterId);
        return await this.createImages(tx, shelterId, files);
    }

    // DELETE
    // 기존 이미지 삭제
    async removeImages(tx: Prisma.TransactionClient, shelterId: string) {
        await tx.shelterImage.deleteMany({ where: { shelterId }});
    }
}
