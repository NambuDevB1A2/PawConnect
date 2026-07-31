// 보호동물 등록

import { fetchClient } from "@/services/fetch/fetch.client";

export async function CreateAnimal(formData: FormData) {
    return fetchClient.post("/animals", formData);
} 