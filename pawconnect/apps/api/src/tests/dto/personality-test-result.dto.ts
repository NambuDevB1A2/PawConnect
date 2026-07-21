import { ApiProperty } from "@nestjs/swagger";

// pawti 테스트 결과 AI에 보내기
export class RecommendAnimalDto  {

    @ApiProperty({example: 1})
    id:number;

    @ApiProperty({example: '봉지'})
    name: string;

    @ApiProperty({example: 3})
    age: number;

    @ApiProperty({example: 'MALE'})
    gender: string;

    @ApiProperty({example: '/animals/bongji.jpg'})
    imgThumbnail: string;

    @ApiProperty({example: '행복보호소'})
    shelterName: string;

    @ApiProperty({example: '푸들'})
    breed: string;
}

export class PersonalityTestResultDto {
    @ApiProperty({example: 'ENFP'})
    mbti: string;

    @ApiProperty({example: '반짝이는 리트리버형'})
    title: string;

    @ApiProperty({example: '리트리버'})
    breed: string;

    @ApiProperty({ type: [String], example:  [
            '활동적',
            '친화적',
            '새로운 경험',
            '에너지 넘침',
        ], })
    keywords: string[];

    @ApiProperty({
        type: [RecommendAnimalDto], description:'추천동물 들'})
    recommendAnimals: RecommendAnimalDto[];

    @ApiProperty({example: true, description:'추천동물 존재 여부'})
    hasRecommendAnimals: boolean;

    @ApiProperty({example:null, nullable:true, 
        description:'추천동물이 없을 경우 안내 메시지'})
    message?: string|null;
}