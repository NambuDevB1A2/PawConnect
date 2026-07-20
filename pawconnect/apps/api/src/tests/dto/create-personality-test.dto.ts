import { ArrayMaxSize, ArrayMinSize, IsArray, IsInt, Max, Min } from "class-validator";

// pawti 테스트 결과 생성
export class CreatePersonalityTestDto {
    @IsArray()
    @ArrayMinSize(20)
    @ArrayMaxSize(20)
    @IsInt({each:true})
    @Min(1, {each:true})
    @Max(2, {each: true})
    answers: number[];
}