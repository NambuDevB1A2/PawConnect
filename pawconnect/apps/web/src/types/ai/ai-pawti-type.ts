// PawTI AI 타입

export interface AIPawtiRequest {
    mbti: string;
    title: string;
    keywords: string[];
    breed: string;
}

export interface AIPawtiResponse {
    success: boolean;

    data : {
        analysis: string;
        recommendReason: string;
        adoptionCheckPoint: string;
        aiComment: string;
    };
}