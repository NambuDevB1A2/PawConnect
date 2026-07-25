import { Injectable } from '@nestjs/common';
import { GetAnimalsQueryDto } from './dto/get-animals.dto';
import { AnimalStatus, Prisma } from '@prisma/client';
import { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { CreateAnimalDto } from './dto/create-animals.dto';
import { AnimalsCreateService } from './animals-create.service';
import { AnimalsQueryService } from './animals-query.service';
import { AnimalsUpdateService } from './animals-update.service';
import { UpdateAnimalDto } from './dto/update-animals.dto';


@Injectable()
export class AnimalsService {
    constructor(
        private readonly createService: AnimalsCreateService,
        private readonly queryService: AnimalsQueryService,
        private readonly updateService: AnimalsUpdateService) {}
  
    // 보호동물 등록 - POST /animals
    create(auth: AuthRequest,dto: CreateAnimalDto, files) {
        return this.createService.create(auth, dto, files);
    }

    // 보호동물 목록 조회 - GET /animals (페이지네이션 + 검색 + 필터)
    findAll(query:GetAnimalsQueryDto){
        return this.queryService.findAll(query);
    }

    // 보호동물 상세 조회 - GET /animals/:id
    findOne(id:number){
        return this.queryService.findOne(id);
    }
    
    // 보호동물 정보 수정 - PATCH /animals/:id
    update(auth: AuthRequest, id:number, dto:UpdateAnimalDto, files) {
        return this.updateService.update(auth, id, dto, files);
    }

    // 보호동물 삭제 - DELETE /animals/:id
    remove(auth: AuthRequest, id:number) {
        return this.updateService.remove(auth, id);
    }

    // 보호동물 상태 변경 - PATCH /animals/:id/status
    updateState(auth: AuthRequest, id:number, status: AnimalStatus){
        return this.updateService.updateState(auth, id, status);
    }
}