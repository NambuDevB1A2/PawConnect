
// 추천 동물
export interface RecommendAnimal {
    id: number;
    name: string;
    age: number;
    gender: string;
    imgThumbnail: string;
    shelterName: string;
    breed: string;
}

// 결과
export interface PawtiResultData {
    mbti: string;
    title: string;
    breed: string;
    keywords: string[];

    representativeAnimal: RecommendAnimal | null;
    matchedAnimal: RecommendAnimal | null;

    hasRecommendAnimals: boolean;
    message: string | null;
}

export interface PawtiRequest  {
    answers: number[];
}