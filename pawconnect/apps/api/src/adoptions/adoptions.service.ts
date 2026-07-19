import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { UsersService } from '@/users/users.service';
import { UpdateAdoptionStatusDto } from './dto/update-adoption-status.dto';
import { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { AnimalStatus } from '@prisma/client';

@Injectable()
export class AdoptionsService {
  constructor(private readonly prisma: PrismaService,
    private readonly usersService: UsersService
  ) { };

  // 입양 신청 등록
  async create(auth: AuthRequest, createAdoptionDto: CreateAdoptionDto) {
    // 이메일로 유저 찾기 => Todo: CurrentAuth 에 userId가 취가되면 email 조회 제거
    const user = await this.usersService.findByEmail(auth.email);
    // detail 과 agreements 분리
    const { animalId, agreements, ...detail } = createAdoptionDto;

    // 1. 존재하는 동물인지 체크
    const animal = await this.prisma.animal.findUnique({
      where: { id: animalId }
    });
    // 존재하는 동물이 아니면 경고 띄우기
    if (!animal) {
      throw new NotFoundException("존재하지 않는 보호 동물 입니다.");
    }

    // 2. 입양 가능한 상태인지 체크(입양가능 상태가 아니면 경고 띄우기)
    if (animal.animalStatus !== AnimalStatus.AVAILABLE) {
      throw new BadRequestException("현재 입양 신청이 불가능한 보호동물 입니다.")
    }

    // 3. 이미 신청한 보호동물인지 체크(중복신청 확인)
    const existingAdoption = await this.prisma.adoption.findFirst({
      where: { userId: user.id, animalId }
    });

    // 존재하면 경고 띄우기
    if (existingAdoption) {
      throw new BadRequestException("이미 해당 동물에 입양 신청을 했습니다.");
    }

    // 4. 입양 신청 등록
    const adoption = await this.prisma.adoption.create({
      data: {
        userId: user.id,
        animalId,
        //detailId: adoptionDetail.id,
        detail: {
          create: detail,
        },
        agreements: {
          create: agreements,
        },
      },
    });

    return {
      message: "입양 신청이 완료되었습니다.",
      adoptionId: adoption.id,    // 등록된 입양신청 아이디
      adoptionStatus: adoption.adoptionStatus,  // 입양 신청 상태(안보내도 되긴함)
    }
  }

  // 내 입양 신청 목록
  async findAll(auth: AuthRequest) {
    // 이메일로 유저 찾기 => Todo: CurrentAuth 에 userId가 취가되면 email 조회 제거
    const user = await this.usersService.findByEmail(auth.email);

    const adoptions = await this.prisma.adoption.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      //include: { animal: true, detail: true},
      include: {
        animal: {
          include: {
            shelter: { select: { name: true } },
            animalSpecies: { select: { name: true } },
            animalBreed: { select: { name: true } },
          }
        }
      }
    }
    );

    return adoptions;
  }

  // 입양신청 상세조회(readOnly 모달)
  async findOne(id: string) {
    const adoption = await this.prisma.adoption.findUnique({
      where: { id },
      include: {
        animal: {
          include: {
            shelter: { select: { name: true } },
            animalSpecies: { select: { name: true } },
            animalBreed: { select: { name: true } },
          },
        },
        detail:true,
        agreements:{
          include:{agreement:true},
        },
      },
    });

    if (!adoption) throw new NotFoundException("입양 신청을 찾을 수 없습니다.");

    return adoption;
  }

  // 입양 신청 상태 수정(보호소관리자만)
  async update(id: string, updateAdoptionStatusDto: UpdateAdoptionStatusDto) {
    const adoption = await this.prisma.adoption.findUnique({
      where: {id},
    });

    if(!adoption) throw new NotFoundException("입양 신청을 찾을 수 없습니다.")

    return await this.prisma.adoption.update({
      where: {id},
      data:{
        adoptionStatus: updateAdoptionStatusDto.adoptionStatus,
      },
    });
  }

  // remove(id: string) {
  //   return `This action removes a #${id} adoption`;
  // }
}
