import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, ArrayNotEmpty, IsBoolean, IsEmail, IsEnum, IsOptional, IsString, IsUUID, MaxLength, ValidateNested } from "class-validator";
import {
    PetExperience, PetExperiencePeriod, ResidenceType,
    PetAllowedStatus, FamilySize, YoungChildStatus,
} from "@prisma/client";
import { AdoptionAgreementDto } from "./adoption-agreement.dto";
import { Type } from "class-transformer";


// 입양 신청 (animalId, 기본정보, 신청서, 약관)
export class CreateAdoptionDto {
    @ApiProperty({
        example: "4b5cbdb7-84e2-4a7f-aab6-6d5b9c0d9e7f",
        description: "입양 신청 대상 동물 ID",
    })
    @IsUUID()
    animalId: string;

    @ApiProperty({ example: "김샛별", description: "신청자 이름", })
    @IsString()
    @MaxLength(30)
    userName: string;

    @ApiProperty({
        example: "example@email.com",
        description: "신청자 이메일(회원 이메일이 기본값으로 표시되며 수정 가능)",
    })
    @IsEmail()
    @MaxLength(255)
    email: string;

    @ApiProperty({ example: "01012345678", description: "신청자 연락처", })
    @IsString()
    @MaxLength(20)
    phone: string;

    @ApiProperty({ example: "서울시 금천구 독산로 50길 23", description: "신청자 주소", })
    @IsString()
    @MaxLength(255)
    address: string;

    @ApiProperty({ example: "교육관 203", description: "상세 주소", })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    addressDetail?: string;

    @ApiProperty({
        enum: PetExperience, example: PetExperience.CURRENT,
        description: "반려동물 양육 경험",
    })
    @IsEnum(PetExperience)
    petExperience: PetExperience;

    @ApiProperty({
        example: "고양이 2마리, 개 1마리",
        description: "반려동물 양육경험 상세",
    })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    petsDescription?: string;

    @ApiProperty({
        enum: PetExperiencePeriod,
        example: PetExperiencePeriod.ONE_TO_THREE_YEARS,
        description: "반려동물 양육기간",
    })
    @IsOptional()
    @IsEnum(PetExperiencePeriod)
    petExperiencePeriod?: PetExperiencePeriod;

    @ApiProperty({
        enum: ResidenceType, example: ResidenceType.APARTMENT,
        description: "거주 형태",
    })
    @IsEnum(ResidenceType)
    residenceType: ResidenceType;

    @ApiProperty({
        enum: PetAllowedStatus, example: PetAllowedStatus.ALLOWED,
        description: "사육 가능 여부",
    })
    @IsEnum(PetAllowedStatus)
    petAllowedStatus: PetAllowedStatus;

    @ApiProperty({
        enum: FamilySize, example: FamilySize.THREE,
        description: "가족구성",
    })
    @IsEnum(FamilySize)
    familySize: FamilySize;

    @ApiProperty({
        enum: YoungChildStatus, example: YoungChildStatus.NONE,
        description: "어린아이 여부"
    })
    @IsEnum(YoungChildStatus)
    youngChildStatus: YoungChildStatus;

    @IsBoolean()
    @ApiProperty({ example: true, description: "가족동의 여부" })
    isFamilyConsent: boolean;

    @ApiProperty({
        example: "가족처럼 지낼 반려동물을 키우고 싶습니다.",
        description: "입양 목적",
    })
    @IsString()
    @MaxLength(100)
    adoptionPurpose: string;

    @IsBoolean()
    @ApiProperty({ example: true, description: "예방접종을 책임지고 진행할 수 있는지 여부" })
    isCanVaccinate: boolean;

    @IsBoolean()
    @ApiProperty({ example: false, description: "질병 발생 시 병원 치료를 제공할 수 있는지 여부" })
    isCanProvideMedicalCare: boolean;

    @IsBoolean()
    @ApiProperty({ example: true, description: "산책 및 운동을 꾸준히 제공할 수 있는지 여부" })
    isCanProvideExercise: boolean;

    @IsBoolean()
    @ApiProperty({ example: true, description: "평생 책임지고 양육할 것에 동의하는지 여부" })
    isAcceptLifetimeResponsibility: boolean;

    @ApiProperty({
        example: "저는 현재 강아지 한마리를 사랑으로 키우고 있습니다.",
        description: "추가 전달 사항",
    })
    @IsString()
    @MaxLength(500)
    additionalNotes: string;

    @ApiProperty({
        type: [AdoptionAgreementDto],
        description: "입양 신청 시 동의한 약관 목록",
        example: [
            {
                agreementId: 1,
                isAgreed: true,
            },
            {
                agreementId: 2,
                isAgreed: true,
            },
        ],
    })
    @ValidateNested({ each: true })
    @Type(() => AdoptionAgreementDto)
    @ArrayNotEmpty()    //빈 배열이면 못들어오게(minSize지정만 있어도 됨)
    @ArrayMinSize(2)
    agreements: AdoptionAgreementDto[];
}