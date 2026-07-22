import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { Equals, IsBoolean, IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterUserAuthDto {
    @ApiProperty({ example: "example@email.com" })
    @IsEmail({}, { message: "올바른 이메일 형식이 아닙니다" })
    email: string;

    @ApiProperty({ example: "Aa123456789!" })
    @IsString()
    @MinLength(6, { message: "비밀번호는 6자 이상이어야 합니다" })
    @MaxLength(30, { message: "비밀번호는 30자 이하여야 합니다" })
    @Matches(/^(?=.*[a-z]).+$/, { message: "영문 소문자를 포함해주세요" })
    @Matches(/^(?=.*[A-Z]).+$/, { message: "영문 대문자를 포함해주세요" })
    @Matches(/^(?=.*\d).+$/, { message: "최소 1자 이상의 숫자를 포함해주세요" })
    @Matches(/^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/, { message: "최소 1자 이상의 특수문자를 포함해주세요" })
    password: string;

    @ApiProperty({ example: "유저1234" })
    @IsString()
    @MinLength(2, { message: "닉네임은 2자 이상이어야 합니다" })
    @MaxLength(16, { message: "닉네임은 16자 이하여야 합니다" })
    @Matches(/^[가-힣a-zA-Z0-9]+$/, { message: "닉네임에 공백 또는 특수문자를 사용할 수 없습니다" })
    nickname: string;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    @IsOptional()
    imgProfile: any;

    @ApiProperty({ example: true })
    @Transform(({ value }) => value === "true" || value === true)
    @IsBoolean()
    @Equals(true, { message: "이용약관 및 개인정보 처리방침에 동의해주세요" })
    agreedToTerms: boolean;
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