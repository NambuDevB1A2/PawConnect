import { Injectable } from '@nestjs/common';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { UpdateAdoptionDto } from './dto/update-adoption.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class AdoptionsService {
  constructor(private readonly prisma:PrismaService){};

  // 입양 신청 등록
  async create(userId:string , createAdoptionDto: CreateAdoptionDto) {
    //const exists = await this.prisma.
  }

  findAll() {
    return `This action returns all adoptions`;
  }

  findOne(id: string) {
    return `This action returns a #${id} adoption`;
  }

  update(id: string, updateAdoptionDto: UpdateAdoptionDto) {
    return `This action updates a #${id} adoption`;
  }

  remove(id: string) {
    return `This action removes a #${id} adoption`;
  }
}
