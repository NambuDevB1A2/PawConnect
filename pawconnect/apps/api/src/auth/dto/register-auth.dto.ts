import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterUserAuthDto {
    @ApiProperty({ example: "example@email.com" })
    @IsEmail({}, { message: "올바른 이메일 형식이 아닙니다" })
    email: string;

    @ApiProperty({ example: "a123456789!" })
    @IsString()
    @MinLength(6, { message: "비밀번호는 6자 이상이어야 합니다" })
    @MaxLength(30, { message: "비밀번호는 30자 이하여야 합니다" })
    password: string;

    @ApiProperty({ example: "유저1234" })
    @IsString()
    @MinLength(2, { message: "닉네임은 2자 이상이어야 합니다" })
    @MaxLength(16, { message: "닉네임은 16자 이하여야 합니다" })
    nickname: string;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    @IsOptional()
    imgProfile: any;
}

export class RegisterShelterAuthDto extends RegisterUserAuthDto {
    @ApiProperty({ example: "서울행복동물보호소" })
    @IsString()
    @MaxLength(100, { message: "보호소 이름은 100자 이하여야 합니다" })
    name: string;

    @ApiProperty({ example: "서울시 금천구 독산로 50길 23" })
    @IsString()
    @MaxLength(255, { message: "올바르지 않은 주소입니다" })
    address: string;

    @ApiProperty({ example: "교육관 203" })
    @IsString()
    @MaxLength(255, { message: "올바르지 않은 주소입니다" })
    addressDetail: string;

    @ApiProperty({ example: "01012345678" })
    @IsString()
    @MaxLength(20, { message: "올바르지 않은 전화번호입니다" })
    phone: string;

    @ApiProperty({ example: "평일 09:00~18:00, 주말/공휴일 휴무" })
    @IsString()
    @MaxLength(100, { message: "운영 시간은 100자 이하여야 합니다" })
    operatingHours: string;
    
    @ApiProperty({ example: "친절과 사랑이 넘치는 동물 보호소입니다." })
    @IsString()
    @MaxLength(500, { message: "보호소 소개말은 500자 이하여야 합니다" })
    description: string;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    @IsOptional()
    imgBanner: any;

    @ApiPropertyOptional({ type: 'string', format: 'binary', isArray: true, })
    @IsOptional()
    imgShelter: any[];
}