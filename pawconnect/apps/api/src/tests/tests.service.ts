import { PrismaService } from '@/prisma/prisma.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonalityTestDto } from './dto/create-personality-test.dto';
import { PERSONALITY_QUESTIONS } from './constants/personality-question.constant';
import { PERSONALITY_TYPES } from './constants/personality-type.constant';
import { PersonalityTestResultDto } from './dto/personality-test-result.dto';
import { MBTI_MATCH_BREEDS } from './constants/personality-match-breeds.constant';
import { animalSelect } from './testAnimal.select';
import { AnimalStatus, Prisma } from '@prisma/client';

// 타입지정
type AnimalSelectType = Prisma.AnimalGetPayload<{ select: typeof animalSelect }>;

@Injectable()
export class TestsService {
    constructor(private readonly prisma: PrismaService) { }

    /*
    사용자가 선택한 20개의 답변을 기반으로 MBTI를 계산한다
    각 문항은  E/I, S/N, T/F, J/P 중 하나의 성향 점수를 1점씩 증가시키며,
    마지막에 각 성향의 점수를 비교하여 최종 MBTI 문자열을 반환한다.
    */
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

        // 사용자가 선택한 답변을 순회하며 성향 점수 계산
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
     * Animal 조회 결과를 RecommendAnimalDto 형태로 변환한다.
     * 추천 동물이 없으면 null을 반환한다.
     */
    private toRecommendAnimal(animal: AnimalSelectType | null) {
        // 추천동물이 없으면 null 반환
        if (!animal) return null;

        return {
            id: animal.id,
            shelterId: animal.shelterId,

            name: animal.name,
            imgThumbnail: animal.imgThumbnail,

            animalStatus: animal.animalStatus,
            species: animal.animalSpecies.name,

            breed: animal.animalBreed.name,
            breedId: animal.animalBreed.id,

            gender: animal.gender,
            isNeutered: animal.isNeutered,
            age: animal.age,
            isEstimatedAge: animal.isEstimatedAge,

            weight: Number(animal.weight),
            shelterName: animal.shelter.name,
            createdAt: animal.createdAt.toISOString(),
        };
    }

    // 조회된 동물 목록에서 랜덤으로 1마리 반환, 조회 결과 없으면 null 반환
    private getRandomAnimal<T>(animals: T[]): T | null {
        if (animals.length === 0) return null;

        return animals[Math.floor(Math.random() * animals.length)];
    }

    /**
     * PawTI 테스트 결과 생성
     * 처리 순서
     * 1. 사용자 답변으로 MBTI 계산
     * 2. MBTI 성향 정보 조회
     * 3. 대표 품종 보호동물 추천 (랜덤 1마리)
     * 4. MBTI와 잘 맞는 품종 보호동물 추천 (랜덤 1마리)
     * 5. 응답 DTO 생성 및 반환
     */
    async createPersonalityResult(dto: CreatePersonalityTestDto): Promise<PersonalityTestResultDto> {
        // 1. 사용자의 답변을 기반으로 MBTI 계산
        const mbti = this.calculateMbti(dto.answers);
        // 2. MBTI 유형 정보 조회 (PERSONALITY_TYPES  조회)
        const type = PERSONALITY_TYPES[mbti];
        if (!type) throw new NotFoundException('성향 타입을찾을수 없습니다.');

        // 3. 대표 품종과 일치하는 보호동물 조회 (breed 얻기 대표 품종 조회)
        const representativeAnimals = await this.prisma.animal.findMany({
            where: { breed: type.breedId, animalStatus: AnimalStatus.AVAILABLE },
            select: animalSelect,
        });

        // TODO
        // 추천 품종이 없으면 프론트에서 없다는 ui띄우기

        // 대표 품종 보호동물 중 랜덤 1마리 선택
        const representativeAnimal = this.getRandomAnimal(representativeAnimals);
        // 프론트 응답 DTO 형태로 변환
        const representativeAnimalDto = this.toRecommendAnimal(representativeAnimal);

        // 4. 잘 맞는 보호동물 품종 목록 추천
        // 사용자 MBTI와 잘 맞는 품종 목록 조회
        const matchBreeds = MBTI_MATCH_BREEDS[mbti] ?? [];

        // 매치된 동물 조회
        const matchAnimals = await this.prisma.animal.findMany({
            where: {
                breed: { in: matchBreeds },
                animalStatus: AnimalStatus.AVAILABLE
            },
            select: animalSelect, //animalSelect
        });
        // 매치된 품종 보호동물 중 랜덤 1마리 선택
        const matchedAnimal = this.getRandomAnimal(matchAnimals);

        // 프론트 응답 DTO 형태로 변환
        const matchedAnimalDto = this.toRecommendAnimal(matchedAnimal);

        // 대표 추천 또는 매칭 추천이 존재하는지 확인
        const hasRecommendAnimals = representativeAnimal !== null || matchedAnimal !== null;

        // 5. 최종 결과 반환
        return {

            mbti: type.mbti,
            title: type.title,
            breed: type.breed,
            keywords: type.keywords,

            representativeAnimal: representativeAnimalDto,
            matchedAnimal: matchedAnimalDto,
            hasRecommendAnimals,
            message: hasRecommendAnimals ? null : '현재 추천 가능한 보호동물이 없습니다.',
        };
    }
}