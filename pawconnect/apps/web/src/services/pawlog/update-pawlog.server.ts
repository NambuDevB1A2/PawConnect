'use server';

import { ApiError } from "@/services/fetch/api-error";
import { fetchServer } from "@/services/fetch/fetch.server";
import { getAccessToken } from "@/services/auth/auth";
import { ResponseUpdatePawLog, UpdatePawLogSate } from "@/types/pawlog/update-pawlog.type";
import { validateTitle } from "@/utils/pawlog/pawlog.validator";

export async function UpdatePawLog(
    pawLogId: number,
    prevState: UpdatePawLogSate,
    formdata: FormData
): Promise<UpdatePawLogSate> {
    const title = formdata.get('title') as string;
    const content = formdata.get('content') as string;
    const imgPawLog = formdata.getAll('imgPawLog') as File[];
    const imgPawLogKeeps = (formdata.get('imgPawLogKeeps') as string).split(',').map((s) => s.trim()).filter((s) => s.length > 0);

    // 1. 값 유무 검사
    if (!title && !content && imgPawLog.length === 0) {
        return {
            titleError: "변경사항이 없습니다",
        };
    }

    // 2. 유효성 검사
    const titleError = validateTitle(title);

    if (titleError) {
        return {
            titleError,
        };
    }

    try {
        // FormData로 fetchServer 전송
        const submitData = new FormData();
        submitData.append('title', title);
        submitData.append('content', content);
        if (imgPawLog.length > 0) imgPawLog.forEach((file) => { if (file.size > 0) submitData.append('imgPawLog', file); })
        submitData.append('imgPawLogKeeps', imgPawLogKeeps.join(','));

        const token = await getAccessToken();
        const result = await fetchServer.patch<ResponseUpdatePawLog>(`/pawlogs/${pawLogId}`, token, submitData);

        // Response를 state에 담아서 반환
        return { response: result };
    } catch (error) {
        if (error instanceof ApiError && error.fields) {
            // 서버에서 온 필드별 에러 매핑
            return {
                titleError: error.fields.title,
                contentError: error.fields.content,
                imgPawLogError: error.fields.imgPawLog,
            };
        }

        // 필드 정보 없는 일반 에러 매핑 (네트워크 오류 등)
        return {
            titleError: "게시 도중 오류가 발생했습니다",
        };
    }
}
