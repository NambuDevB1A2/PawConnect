/**
 * 보호동물 상세조회 API DTO
 */
import { ApiProperty } from "@nestjs/swagger";
import { AdoptionStatus, AnimalGender, AnimalStatus } from "@prisma/client";

// Response 응답 DTO
export class AnimalDetailResponseDto {
  @ApiProperty({ example: 1 ,description: "상세아이디"})
  id: number;

  @ApiProperty({ example: 'uuid...', description: "보호소 아이디" })
  shelterId: string;

  @ApiProperty({ example: '행복 보호소' , description: "보호소 이름" })
  shelterName: string;

  @ApiProperty({ example: '봉지', description: "보호동물 이름"  })
  name: string;

  @ApiProperty({ example: '고양이' , description: "동물 종류" })
  species: string;

  @ApiProperty({ example: '코리안숏헤어', description: "동물 품종"  })
  breed: string;

  @ApiProperty({ enum: AnimalGender, example: AnimalGender.FEMALE, description: "성별" })
  gender: AnimalGender;

  @ApiProperty({ example: true, description: "중성화 여부" })
  isNeutered: boolean;

  @ApiProperty({ example: 24, description: "나이" })
  age: number;

  @ApiProperty({ example: false, description: "나이 추정 여부" })
  isEstimatedAge: boolean;

  @ApiProperty({ example: 4.3, description: "몸무게" })
  weight: number;

  @ApiProperty({ enum: AnimalStatus, example: AnimalStatus.AVAILABLE, 
                description: "동물 상태" })
  animalStatus: AnimalStatus;

  @ApiProperty({ example: 'animals/thumbnail/abc.jpg' , description: "썸네일 이미지" })
  thumbnail: string;

  @ApiProperty({ type: [String], example: ['animals/image1.jpg',
      'animals/image2.jpg',] , description: "보호소 이미지들" })
  images: string[];

  @ApiProperty({ description: "공고 시작일" })
  noticeStartDate: Date | undefined;

  @ApiProperty({ description: "공고 마감일" })
  noticeEndDate: Date | undefined;

  @ApiProperty({ example: '서울시 강남구',  description: "발견 장소"  })
  foundLocation: string | undefined;

  @ApiProperty({ example: '사람을 잘 따름', description: "특이사항" })
  specialNotes: string | undefined;

  @ApiProperty({ example: '건강하고 활발한 아이입니다', description: "소개말"  })
  description: string | undefined;

  @ApiProperty({ example: '예방접종 완료' , description: "건강상태" })
  healthStatus: string | undefined;
}