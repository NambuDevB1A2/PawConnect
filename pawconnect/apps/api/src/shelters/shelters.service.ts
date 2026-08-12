import { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { QueryGetShelterAdoptionsDto, QueryGetShelterAnimalsDto } from '@/shelters/dto/query-shelter.dto';
import { UpdateShelterDto } from '@/shelters/dto/update-shelter.dto';
import { SheltersReadService } from '@/shelters/shelters-read.service';
import { SheltersUpdateService } from '@/shelters/shelters-update.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SheltersService {
    constructor (
        private readonly sheltersReadService: SheltersReadService,
        private readonly sheltersUpdateService: SheltersUpdateService,
    ) {}
    
    // 내 보호소 정보 조회
    async getMyShelter(auth: AuthRequest) {
        const result = await this.sheltersReadService.getMyShelter(auth);
        return { success: true, ...result };
    }

    // 내 보호소 정보 수정
    async update(auth: AuthRequest, updateShelterDto: UpdateShelterDto, file?: Express.Multer.File, files?: Express.Multer.File[]) {
        const result = await this.sheltersUpdateService.update(auth, updateShelterDto, file, files);
        return { success: true, ...result };
    }

    // 내 보호소 입양 신청 목록 조회
    async getMyShelterAdoptions(auth: AuthRequest, query: QueryGetShelterAdoptionsDto) {
        const result = await this.sheltersReadService.getMyShelterAdoptions(auth, query);
        return { success: true, ...result };
    }

    // 보호소 목록 조회
    async getShelters(pagination: QueryPaginationDto) {
        const result = await this.sheltersReadService.getShelters(pagination);
        return { success: true, ...result };
    }

    // 보호소 상세 조회 (name)
    async getShelterByName(name: string) {
        const result = await this.sheltersReadService.getShelterByName(name);
        return { success: true, ...result };
    }

    // 내 보호소 동물 목록 조회 - GET /shelters/me/animals
    async getMyAnimals(auth: AuthRequest, query: QueryGetShelterAnimalsDto) {
        const result = await this.sheltersReadService.getMyAnimals(auth, query);
        return { success: true, ...result };
    }
}