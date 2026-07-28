import { TRANSFORM_STRING_TO_ARRAY, TRANSFORM_STRING_TO_BOOLEAN } from "@/common/dto/format.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsBoolean, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateShelterDataDto {
    @ApiPropertyOptional({ example: "서울시 금천구 독산로 50길 23" })
    @IsOptional()
    @IsString()
    address: string;

    @ApiPropertyOptional({ example: "교육관 203" })
    @IsOptional()
    @IsString()
    addressDetail: string;

    @ApiPropertyOptional({ example: "01012345678" })
    @IsOptional()
    @IsString()
    @MaxLength(20)
    phone: string;

    @ApiPropertyOptional({ example: "평일 09:00~18:00, 주말/공휴일 휴무" })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    operatingHours: string;
    
    @ApiPropertyOptional({ example: "친절과 사랑이 넘치는 동물 보호소입니다." })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    description: string;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    @IsOptional()
    imgBanner: any;
}

export class UpdateShelterDto extends UpdateShelterDataDto {
    @ApiPropertyOptional({ example: false })
    @IsOptional()
    @Transform(TRANSFORM_STRING_TO_BOOLEAN)
    @IsBoolean()
    imgBannerRemoved?: boolean;
    
    @ApiPropertyOptional({ type: 'string', format: 'binary', isArray: true, })
    @IsOptional()
    imgShelter: any[];

    @ApiPropertyOptional()
    @IsOptional()
    @Transform(TRANSFORM_STRING_TO_ARRAY)
    @IsArray()
    @IsString({ each: true })
    imgShelterKeeps?: string[];
}
