import { fetchClient } from "../fetch/fetch.client";


interface UpdateAnimalResponse {
    success: boolean;
    animalId: number;
}

// 보호동물 수정
export async function updateAnimal(id: number, formData: FormData) {
        return fetchClient.patch<UpdateAnimalResponse>(
            `/animals/${id}`, formData);
}