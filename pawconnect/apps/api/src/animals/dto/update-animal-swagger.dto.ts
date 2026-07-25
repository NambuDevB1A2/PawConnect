import { ApiProperty } from "@nestjs/swagger";
import { UpdateAnimalDto } from "./update-animals.dto";

export class UpdateAnimalRequestDto extends UpdateAnimalDto {
    @ApiProperty({
        type: 'string',
        format: 'binary',
        required: false,
    })
    imgThumbnail?: any;

    @ApiProperty({
        type: 'array',
        items: {
            type: 'string',
            format: 'binary',
        },
        required: false,
    })
    images?: any[];
}