import { PawtiRequest, PawtiResult } from "@/types/pawti/pawti.type";
import { fetchClient } from "../fetch/fetch.client";

export async function SubmitPawti(body: PawtiRequest) {
    return fetchClient.post<PawtiResult>(
        "/tests/personality",
        body
    );
}