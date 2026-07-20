import { PrismaService } from '@/prisma/prisma.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonalityTestDto } from './dto/create-personality-test.dto';
import { PERSONALITY_QUESTIONS } from './constants/personality-question.constant';
import { PERSONALITY_TYPES } from './constants/personality-type.constant';
import { PersonalityTestResultDto } from './dto/personality-test-result.dto';

@Injectable()
export class TestsService {
    constructor(private readonly prisma: PrismaService) { }

    // MBTI 계산
    private calculateMbti(answers: number[]) {
        const scores = {
            E: 0,
            I: 0,
            S: 0,
            N: 0,
            T: 0,
            F: 0,
            J: 0,
            P: 0,
        };

        // 각 답변에 해당하는 성향 점수 계산
        answers.forEach((answer, index) => {
            const question = PERSONALITY_QUESTIONS[index];
            const selected = question.options[answer - 1];
            if (!selected) throw new BadRequestException('잘못된 답변입니다.');

            scores[selected.score]++;
        });
        // 최종 MBTI 조합 생성
        return (
            (scores.E >= scores.I ? 'E' : 'I') +
            (scores.S >= scores.N ? 'S' : 'N') +
            (scores.T >= scores.F ? 'T' : 'F') +
            (scores.J >= scores.P ? 'J' : 'P')
        );
    }

    // PawTI 테스트 결과 생성
    async createPersonalityResult(dto: CreatePersonalityTestDto):Promise<PersonalityTestResultDto {
        // 1. MBTI 계산
        const mbti = this.calculateMbti(dto.answers);
        // 2. MBTI 유형 정보 조회 (PERSONALITY_TYPES  조회)
        const type = PERSONALITY_TYPES[mbti];
        if (!type) throw new NotFoundException('성향 타입을찾을수 없습니다.');

        // 3. 대표 품종과 일치하는 보호동물 조회 (breed 얻기 대표 품종 조회)
        const animals = await this.prisma.animal.findMany({
            where: {
                breed: type.breedId,
                animalStatus: 'AVAILABLE',
            },
            take: 2,
            select: {
                id: true,
                name: true,
                age: true,
                gender: true,
                imgThumbnail: true,

                shelter: {
                    select: { name: true }
                },

                animalBreed: {
                    select: { name: true }
                }
            }
            // include: { 
            //     shelter: { select: { name: true } },
            //     animalBreed: true,
            //     animalSpecies: true,
            // },
        });
        // TODO
        // 추천 품종이 없으면 프론트에서 없다는 ui띄우기
        // 같은 Species(개/고양이)에서 추천하도록 개선 예정

        // 4. 응답 데이터 가공 (프론트에서 사용하기 쉽도록 응답 형태 변환)
        const recommendAnimals = animals.map((animal) => ({
            id: animal.id,
            name: animal.name,
            age: animal.age,
            gender: animal.gender,
            imgThumbnail: animal.imgThumbnail,
            shelterName: animal.shelter.name,
            breed: animal.animalBreed.name,
        }));

        // 5. 결과 반환
        return {
            mbti: type.mbti,
            title: type.title,
            breed: type.breed,
            keywords: type.keywords,
            recommendAnimals,
        };
    }
}
