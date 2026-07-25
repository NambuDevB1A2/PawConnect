import { AnimalsController } from '@/animals/animals.controller';
import { AnimalsService } from '@/animals/animals.service';
import { Module } from '@nestjs/common';
import { AnimalsCreateService } from './animals-create.service';
import { AnimalsQueryService } from './animals-query.service';
import { AnimalsUpdateService } from './animals-update.service';
import { AnimalUploadService } from './animal-upload.service';
import { PrismaService } from '@/prisma/prisma.service';
import { AzureBlobService } from '@/azure/azure-blob/azure-blob.service';

@Module({
  controllers: [AnimalsController],
  providers: [
    AnimalsService,
    AnimalsCreateService,
    AnimalsQueryService,
    AnimalsUpdateService,
    AnimalUploadService,
    PrismaService,
    AzureBlobService,
  ]
})
export class AnimalsModule {}
