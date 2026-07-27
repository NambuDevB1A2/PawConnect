// 스웨거용 등록 DTO

import { ApiProperty } from "@nestjs/swagger";
import { CreateAnimalDto } from "./create-animals.dto";

export class CreateAnimalRequestDto extends CreateAnimalDto {
 
  @ApiProperty({type: 'string', format: 'binary'})
  imgThumbnail: any;

  @ApiProperty({type: 'array', items: {type:'string', format:'binary'}})
  images: any[];

}