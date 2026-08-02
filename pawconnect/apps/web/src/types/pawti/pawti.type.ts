import { Animal } from "../paw/animal.type";


// 추천 동물
export interface RecommendAnimal extends Animal{
    // id: number;
    // name: string;
    // age: number;
    // gender: string;
    // imgThumbnail: string;
    // shelterName: string;
    // breed: string;
    breedId: number;
}

// 결과
export interface PawtiResultData {
    mbti: string;
    title: string;
    breed: string;
    // breedId: number;
    keywords: string[];

    representativeAnimal: RecommendAnimal | null;
    matchedAnimal: RecommendAnimal | null;

    hasRecommendAnimals: boolean;
    message: string | null;
}

export interface PawtiRequest  {
    answers: number[];
}