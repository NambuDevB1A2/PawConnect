import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, MaxLength } from "class-validator";

export class RegisterAuthDto {
    @ApiProperty({ example: "example@email.com" })
    @IsString()
    email: string;

    @ApiProperty({ example: "a123456789!" })
    @IsString()
    @Length(6, 30)
    password: string;

    @ApiProperty({ example: "유저1234" })
    @IsString()
    @Length(2, 16)
    nickname: string;

    // TODO : 이미지 추가
    @ApiProperty({ example: "/defualt_profile.png" })
    @IsString()
    imgProfile: string;
}

export class RegisterShelterAuthDto extends RegisterAuthDto {
    @ApiProperty({ example: "서울행복동물보호소" })
    @IsString()
    @MaxLength(100)
    name: string;

    @ApiProperty({ example: "서울시 금천구 독산로 50길 23" })
    @IsString()
    address: string;

    @ApiProperty({ example: "교육관 203" })
    @IsString()
    addressDetail: string;

    @ApiProperty({ example: "01012345678" })
    @IsString()
    @MaxLength(20)
    phone: string;

    @ApiProperty({ example: "평일 09:00~18:00, 주말/공휴일 휴무" })
    @IsString()
    @MaxLength(100)
    operatingHours: string;
    
    @ApiProperty({ example: "친절과 사랑이 넘치는 동물 보호소입니다." })
    @IsString()
    @MaxLength(500)
    description: string;

    // TODO : 이미지 추가
    @ApiProperty({ example: "/defualt_banner.png" })
    @IsString()
    imgBanner: string;
}