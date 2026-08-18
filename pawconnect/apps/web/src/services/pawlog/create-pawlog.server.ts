'use server';

import { ApiError } from "@/services/fetch/api-error";
import { fetchServer } from "@/services/fetch/fetch.server";
import { getAccessToken } from "@/services/auth/auth";
import { CreatePawLogSate, ResponseCreatePawLog } from "@/types/pawlog/create-pawlog.type";
import { validateTitle } from "@/utils/pawlog/pawlog.validator";

export async function CreatePawLog(prevState: CreatePawLogSate, formdata: FormData): Promise<CreatePawLogSate> {
    const title = formdata.get('title') as string;
    const content = formdata.get('content') as string;
    const imgPawLog = formdata.getAll('imgPawLog') as File[];

    // 1. 값 유무 검사
    if (!title) {
        return {
            title,
            content,

            titleError: !title ? "제목을 입력해주세요" : "",
        };
    }

    // 2. 유효성 검사
    const titleError = validateTitle(title);

    if (titleError) {
        return {
            title,
            content,
            titleError,
        };
    }

    try {
        // FormData로 fetchServer 전송
        const submitData = new FormData();
        submitData.append('title', title);
        submitData.append('content', content);
        if (imgPawLog.length > 0) imgPawLog.forEach((file) => { if (file.size > 0) submitData.append('imgPawLog', file); })

        const token = await getAccessToken();
        const result = await fetchServer.post<ResponseCreatePawLog>('/pawlogs', token, submitData);

        // Response를 state에 담아서 반환
        return { response: result };
    } catch (error) {
        if (error instanceof ApiError && error.fields) {
            // 서버에서 온 필드별 에러 매핑
            return {
                title,
                content,
                titleError: error.fields.title,
                contentError: error.fields.content,
                imgPawLogError: error.fields.imgPawLog,
            };
        }

        // 필드 정보 없는 일반 에러 매핑 (네트워크 오류 등)
        return {
            title,
            content,
            titleError: "게시 도중 오류가 발생했습니다",
        };
    }
}
