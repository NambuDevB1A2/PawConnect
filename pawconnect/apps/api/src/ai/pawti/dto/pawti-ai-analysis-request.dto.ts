import { ApiProperty } from "@nestjs/swagger";

export class PawtiAiAnalysisRequestDto {
    @ApiProperty({example:""})
    mbti: string;

    title:string;


}