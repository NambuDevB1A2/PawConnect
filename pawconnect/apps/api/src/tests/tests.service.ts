import { PrismaService } from '@/prisma/prisma.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonalityTestDto } from './dto/create-personality-test.dto';
import { PERSONALITY_QUESTIONS } from './constants/personality-question.constant';
import { PERSONALITY_TYPES } from './constants/personality-type.constant';
import { PersonalityTestResultDto } from './dto/personality-test-result.dto';

@Injectable()
export class TestsService {
    constructor(private readonly prisma: PrismaService) { }

    /*
    사용자가 선택한 20개의 답변을 MBTI 유형으로 변환한다.
    각 문항은  E/I, S/N, T/F, J/P 중 하나의 성향 점수를 1점씩 증가시키며,
    마지막에 각 점수를 비교하여 최종 MBTI를 계산한다
    */
    // MBTI 계산(사용자의 답변을 MBTI 유형으로 계산)
    private calculateMbti(answers: number[]) {
        // 8개의 성향의 점수를 저장할 객체 0으로 시작
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
        // index : 현재 몇 번째 문제인지, answer = 사용자가 선택한 번호(1또는 2)
        answers.forEach((answer, index) => {
            // 현재 문제 가져오기
            const question = PERSONALITY_QUESTIONS[index];
            // 사용자가 1번을 선택하면 options[0],
            // 2번을 선택하면 options[1]을 가져오기 위해 -1 처리
            const selected = question.options[answer - 1];
            if (!selected) throw new BadRequestException('잘못된 답변입니다.');

            // 선택된 성향의 점수를 1증가 (예: scores.E++)
            scores[selected.score]++;
        });
        // 각 성향 점수를 비교하여 최종 MBTI 문자열 생성(더 높은 성향을 선택)
        return (
            (scores.E >= scores.I ? 'E' : 'I') +
            (scores.S >= scores.N ? 'S' : 'N') +
            (scores.T >= scores.F ? 'T' : 'F') +
            (scores.J >= scores.P ? 'J' : 'P')
        );
    }

    /**
     * PawTI 테스트 결과 생성
     *
     * 처리 순서
     * 1. MBTI 계산
     * 2. MBTI에 해당하는 성향 정보 조회
     * 3. 대표 품종과 일치하는 보호동물 조회
     * 4. 프론트에서 사용하기 좋은 형태로 데이터 가공
     * 5. 최종 결과 반환
     */
    // PawTI 테스트 결과 생성
    async createPersonalityResult(dto: CreatePersonalityTestDto): Promise<PersonalityTestResultDto> {
        // 1. 사용자의 답변을 기반으로 MBTI 계산
        const mbti = this.calculateMbti(dto.answers);
        // 2. MBTI 유형 정보 조회 (PERSONALITY_TYPES  조회)
        const type = PERSONALITY_TYPES[mbti];
        if (!type) throw new NotFoundException('성향 타입을찾을수 없습니다.');

        // 3. 대표 품종과 일치하는 보호동물 조회 (breed 얻기 대표 품종 조회)
        const animals = await this.prisma.animal.findMany({
            // DB에서 리트리버 + AVAILABLE 상태인 동물만 조회
            where: {
                breed: type.breedId,
                animalStatus: 'AVAILABLE',
            },
            take: 2,    // 추천 동물은 최대 2마리까지만 조회
            // 응답에 필요한 컬럼만 선택하여 조회
            // (select를 사용하면 불필요한 데이터까지 가져오지 않음)
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
        // prisma 조회 결과를 프론트에서 사용하는 응답형태(DTO)로 변환
        const recommendAnimals = animals.map((animal) => ({
            id: animal.id,
            name: animal.name,
            age: animal.age,
            gender: animal.gender,
            imgThumbnail: animal.imgThumbnail,
            shelterName: animal.shelter.name,
            breed: animal.animalBreed.name,
        }));

        // 5. 최종 결과 반환
        /*
            최종 응답 반환
            - 추천 동물이 있으면
            hasRecommendAnimals = true
            message = null
            - 추천 동물이 없으면
            hasRecommendAnimals = false
            message에 안내 문구 전달
        */
        return {
            mbti: type.mbti,
            title: type.title,
            breed: type.breed,
            keywords: type.keywords,
            recommendAnimals,
            hasRecommendAnimals: recommendAnimals.length > 0,
            message:
                recommendAnimals.length > 0 ? null : '현재 추천 가능한 보호동물이 없습니다.',
        };
    }
}