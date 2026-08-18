import { ApiError } from "@/services/fetch/api-error";
import { fetchClient } from "@/services/fetch/fetch.client";
import { GenerateAnimalState, ResponseGenerateAnimal } from "@/types/paw/generate-animal.type";

export async function GenerateAnimal(prevState: GenerateAnimalState, formdata: FormData): Promise<GenerateAnimalState> {
    const description = formdata.get('description') as string;
    const healthStatus = formdata.get('healthStatus') as string;
    const species = formdata.get('species') as string | null;
    const breed = formdata.get('breed') as string | null;
    const images = formdata.getAll('images') as File[];

    const validImages = images.filter((file) => file.size > 0);

    // 1. 값 유무 검사
    if (!validImages || validImages.length === 0) {
        return {
            description,
            healthStatus,
            imagesError: "이미지를 한 장이상 업로드해주세요",
        };
    }

    try {
        // FormData로 fetchClient 전송
        const submitData = new FormData();
        submitData.append('description', description ?? '');
        submitData.append('healthStatus', healthStatus ?? '');
        if (species) submitData.append('species', species);
        if (breed) submitData.append('breed', breed);
        validImages.forEach((file) => submitData.append('images', file));

        const result = await fetchClient.post<ResponseGenerateAnimal>('/ai/animals/generate', submitData);

        // Response를 state에 담아서 반환
        return { response: result };
    } catch (error) {
        if (error instanceof ApiError && error.fields) {
            // 서버에서 온 필드별 에러 매핑
            return {
                description,
                healthStatus,
                descriptionError: error.fields.description,
                healthStatusError: error.fields.healthStatus,
                imagesError: error.fields.images,
            };
        }

        // 필드 정보 없는 일반 에러 매핑 (네트워크 오류 등)
        return {
            description,
            healthStatus,
            descriptionError: "AI 소개글 작성 도중 오류가 발생했습니다",
        };
    }
}
