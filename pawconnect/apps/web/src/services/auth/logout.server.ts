'use server';

import { deleteAccessToken, getAccessToken } from "@/services/auth/auth";
import { fetchServer } from "@/services/fetch/fetch.server";
import { FetchState } from "@/types/fetch";
import { ApiResponse } from "@/types/response.type";

export async function Logout(): Promise<FetchState> {
    try {
        // server용 fetch 사용
        // use server로 서버에서 fetch 전송 (getAccessToken, deleteAccessToken 사용은 서버에서만 가능)
        const token = await getAccessToken();
        const result = await fetchServer.post<ApiResponse>('/auth/logout', token);
        await deleteAccessToken();

        return { response: result };
    } catch (error) {
        return { error: "로그아웃에 실패했습니다" }
    }
}