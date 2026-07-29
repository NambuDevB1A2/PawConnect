import { ApiError } from "@/services/fetch/api-error";
import { fetchClient } from "@/services/fetch/fetch.client";
import { GeneratePawLogState, ResponseGeneratePawLog } from "@/types/pawlog/gernerate-pawlog.type";

export async function GeneratePawLog(prevState: GeneratePawLogState, formdata: FormData): Promise<GeneratePawLogState> {
    const content = formdata.get('content') as string;
    const imgPawLog = formdata.getAll('imgPawLog') as File[];

    const validImages = imgPawLog.filter((file) => file.size > 0);

    // 1. 값 유무 검사
    if (!validImages || validImages.length === 0) {
        return {
            content,
            imgPawLogError: "이미지를 한 장이상 업로드해주세요", 
        };
    }

    try {
        // FormData로 fetchClient 전송
        const submitData = new FormData();
        submitData.append('content', content);
        if (validImages.length > 0) validImages.forEach((file) => { if (file.size > 0) submitData.append('images', file); })

        const result = await fetchClient.post<ResponseGeneratePawLog>('/ai/pawlogs/generate', submitData);
        
        // Response를 state에 담아서 반환
        return { response: result };
    } catch (error) {
        if (error instanceof ApiError && error.fields) {
            // 서버에서 온 필드별 에러 매핑
            return {
                content,
                contentError: error.fields.content,
                imgPawLogError: error.fields.images,
            };
        }

        // 필드 정보 없는 일반 에러 매핑 (네트워크 오류 등)
        return {
            content,
            contentError: "AI 게시글 작성 도중 오류가 발생했습니다",
        };
    }
}