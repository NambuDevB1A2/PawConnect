import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";




// response
export class PersonalityAnalysisResultDto {
    @ApiProperty({
        example: '당신은 사람과의 교감을 중요하게 생각하며 새로운 환경에서 잘 적응하는 성향입니다.'})
    personality : string;

     @ApiProperty({
        example: '리트리버는 활발하고 사람을좋아하는 성격이라 당신과 잘 어울립니다.'})
    matchingReason: string;

    @ApiProperty({
    example:
      '활동량이 많은 품종이므로 하루 2회 이상 산책 시간을 확보하는 것이 좋습니다.'})
    adoptionTip : string;

    @ApiProperty({
    example:
      '당신이라면 따뜻한 가족이 되어줄 수 있을 거예요'})
    aiComment: string;
}