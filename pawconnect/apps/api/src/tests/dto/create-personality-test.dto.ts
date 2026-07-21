import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsInt, Max, Min } from "class-validator";

// pawti 테스트 결과 생성
export class CreatePersonalityTestDto {
    @ApiProperty({
        example: [1,2,1,2,1,1,2,2,1,2,1,1,2,2,1,2,1,1,2,2],
        description: "성향테스트 답 숫자 배열로(1 또는 2)"
    })
    @IsArray()
    @ArrayMinSize(20)
    @ArrayMaxSize(20)
    @IsInt({each:true})
    @Min(1, {each:true})
    @Max(2, {each: true})
    answers: number[];      // 20개 문항의 답변(1,2로 구성)
}