import { PawtiRequest } from "@/types/pawti/pawti.type";
import { fetchClient } from "../fetch/fetch.client";

export async function SubmitPawti(body: PawtiRequest) {
    return fetchClient.post<PawtiRequest>(
        "/tests/personality",
        body
    );
}