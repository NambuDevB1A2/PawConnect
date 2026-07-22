// 수정 DTO

import { PartialType } from "@nestjs/swagger";
import { AnimalGender } from "@prisma/client";
import { CreateAnimalDto } from "./create-animals.dto";

export class UpdateAnimalDto extends PartialType(CreateAnimalDto) {}