import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


// request
export class CreatePersonalityAnalysisDto {
    @ApiProperty({example: 'ENFP'})
    @IsString()
    mbti: string;

    title: string;

    breed: string;

    keywords: string[];
    //recommendAnimals: RecommendAnimalDto[];
}