import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { UpdateAdoptionStatusDto } from './dto/update-adoption-status.dto';
import { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { AdoptionStatus, AnimalStatus } from '@prisma/client';
import { ADOPTION_ANIMAL_INCLUDE, ADOPTION_ORDERBY } from './adoption.select';
import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { getPagination, getTotalPage } from '@/common/utils/pagination.util';

@Injectable()
export class AdoptionsService {
  constructor(private readonly prisma: PrismaService) { };

  // 입양 신청 등록
  async create(auth: AuthRequest, createAdoptionDto: CreateAdoptionDto) {
    // detail 과 agreements 분리
    const { animalId, agreements, ...detail } = createAdoptionDto;

    // 1. 신청대상 보호동물이 존재하는지 확인
    const animal = await this.prisma.animal.findUnique({
      where: { id: animalId }
    });
    // 존재하는 동물이 아니면 경고 띄우기
    if (!animal) {
      throw new NotFoundException({ message: "존재하지 않는 보호 동물 입니다."});
    }

    // 2. 현재 입양 가능한 상태인지 체크(입양가능 상태가 아니면 경고 띄우기)
    if (animal.animalStatus !== AnimalStatus.AVAILABLE) {
      throw new BadRequestException({ message: "현재 입양 신청이 불가능한 보호동물 입니다."});
    }

    // 3. 동일한 보호동물에 이미 신청한 이력이 있는지 확인(중복신청 확인)
    const existingAdoption = await this.prisma.adoption.findFirst({
      where: { userId: auth.id, animalId }
    });

    // 존재하면 경고 띄우기
    if (existingAdoption) {
      throw new BadRequestException({ message: "이미 해당 동물에 입양 신청을 했습니다."});
    }

    // 4. 입양 신청서 생성
    const adoption = await this.prisma.adoption.create({
      data: {
        userId: auth.id,
        animalId,
        detail: {
          create: detail,
        },
        agreements: {
          create: agreements,
        },
      },
    });

    return {
      success: true,
      message: "입양 신청이 완료되었습니다.",
      adoptionId: adoption.id,    // 등록된 입양신청 아이디
      adoptionStatus: adoption.adoptionStatus,  // 입양 신청 상태(안보내도 되긴함)
    }
  }

  // 로그인한 사용자의 입양 신청 목록 조회
  async findAll(auth: AuthRequest, { page, limit }: QueryPaginationDto) {
    const [adoptions, totalCount] = await Promise.all([
        this.prisma.adoption.findMany({
        where: { userId: auth.id },
        include: ADOPTION_ANIMAL_INCLUDE,
        orderBy: ADOPTION_ORDERBY.NEWEST,
        ...getPagination(page, limit),
      }),
      this.prisma.adoption.count({
        where: { userId: auth.id },
      }),
    ]);

    const totalPage = getTotalPage(totalCount, limit); // totalPage 값 추출
    return { success: true, adoptions, pagination: { page, limit, totalCount, totalPage }};
  }

  // 입양신청 상세조회(readOnly 모달)
  async findOne(auth: AuthRequest, id: string) {
    // 1. 입양 신청 조회
    const adoption = await this.prisma.adoption.findUnique({
      where: { id },
      include: {
        ...ADOPTION_ANIMAL_INCLUDE,
        detail: true,
        agreements: {
          include: { agreement: true },
        },
      },
    });
    
    // 존재하지 않는 신청인 경우
    if (!adoption) throw new NotFoundException("입양 신청을 찾을 수 없습니다.");
    // 2. 일반사용자는 본인이 작성한 신청서만 조회 가능
    if (auth.role === 'USER' && adoption.userId !== auth.id) {
      throw new ForbiddenException('조회 권한이 없습니다.');
    }

    // 보호소 관리자는 자신의 보호소에 접수된 신청만 조회 가능
    // 현재 JWT에 shelterId가 없어 구현 보류
    if(auth.role === 'SHELTER' && adoption.animal.shelterId !== auth.shelterId){
      throw new ForbiddenException({ message: '조회 권한이 없습니다.' });
    }

    return { success: true, adoption };
  }

  // 내 보호소 입양 신청 목록 조회
  async findByShelter(shelterId: string, { page, limit }: QueryPaginationDto, status: AdoptionStatus) {
    const where = { 
        animal: { shelterId: shelterId }, 
        adoptionStatus: status 
    };

    const [adoptions, totalCount] = await Promise.all([
        this.prisma.adoption.findMany({
            where,
            include: ADOPTION_ANIMAL_INCLUDE,
            orderBy: ADOPTION_ORDERBY.NEWEST,
            ...getPagination(page, limit),
        }),
        this.prisma.adoption.count({
            where,
        })
    ]);
    const totalPage = getTotalPage(totalCount, limit);
    return { adoptions, totalCount, totalPage };
  }

  // 입양 신청 상태 수정
  async update(auth: AuthRequest, id: string, updateAdoptionStatusDto: UpdateAdoptionStatusDto) {
    //1. 수정할 입양 신청 조회
    const adoption = await this.prisma.adoption.findUnique({
      where: { id },
      include: { animal: true }
    });

    // 존재하지 않는 신청인 경우
    if (!adoption) throw new NotFoundException({ message: "입양 신청을 찾을 수 없습니다." });

    // 일반 사용자는 자신의 신청만 수정 가능
    if (auth.role === 'USER' && adoption.userId !== auth.id){
      throw new ForbiddenException({ message: '수정 권한이 없습니다.' });
    }

    // 보호소 관리자는 자신의 보호소에 접수된 신청만 수정 가능
    if (auth.role === 'SHELTER' && adoption.animal.shelterId !== auth.shelterId){
      throw new ForbiddenException({ message: '수정 권한이 없습니다.' });
    }

    // 2. 신청 상태 변경
    await this.prisma.adoption.update({
      where: { id },
      data: {
        adoptionStatus: updateAdoptionStatusDto.adoptionStatus,
      },
    });

    return { success: true, adoptionId: adoption.id };
  }

}
