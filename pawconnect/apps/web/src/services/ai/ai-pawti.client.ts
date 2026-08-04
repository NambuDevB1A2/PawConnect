// AI PawTI 클라이언트 서비스
// POST /ai/pawlab/pawti/analysis

import { AIPawtiRequest, AIPawtiResponse } from "@/types/ai/ai-pawti-type";
import { fetchClient } from "../fetch/fetch.client";

export async function  SubmitAIPawti(body: AIPawtiRequest) {
    return fetchClient.post<AIPawtiResponse>(
        "/ai/pawlab/pawti/analysis",
        body,
    );    
}