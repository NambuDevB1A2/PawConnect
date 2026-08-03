import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsOptional, IsString, Min } from "class-validator";
import { AiPawtiAnalysisResponseDto } from "./ai-pawti-analysis-response.dto";

// AI에게 요청할 DTO
export class AiPawtiAnalysisRequestDto {
    @ApiProperty({ example: "ENFP", description: "PawTI MBTI 결과" })
    @IsString()
    mbti: string;

    @ApiProperty({
        example: "반짝이는 리트리버형",
        description: "PawTI 결과 제목"
    })
    @IsString()
    title: string;

    @ApiProperty({
        example: ["활동적", "친화적", "새로운 경험"],
        description: "성향 키워드"
    })
    @IsArray()
    @IsString({ each: true })
    keywords: string[];

    @ApiProperty({ example: "리트리버", description: "추천 대표 품종" })
    @IsString()
    breed: string;

    // @ApiProperty({
    //     example: "봉지",
    //     description: "추천 보호동물 이름", required: false
    // })
    // @IsOptional()
    // @IsString()
    // animalName?: string;

    // @ApiProperty({
    //     example: "3살",
    //     description: "추천 동물 나이", required: false
    // })
    // @IsOptional()
    // @IsInt()
    // @Min(0)
    // animalAge?: number;

    // @ApiProperty({
    //     example: "사람을 좋아하고 활발한 성격",
    //     description: "추천 동물 특징", required: false
    // })
    // @IsOptional()
    // @IsString()
    // animalDescription?: string;
}

export class AiPawtiAnalysisApiResponseDto 
    extends AiPawtiAnalysisResponseDto {

    @ApiProperty({
        example:true,
        description:"요청 성공 여부"
    })
    success:boolean;
}