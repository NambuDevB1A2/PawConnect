'use server';

import { deleteAccessToken, getAccessToken } from "@/services/auth/auth";
import { fetchServer } from "@/services/fetch/fetch.server";
import { ResponseLogout } from "@/types/auth/logout.type";
import { FetchState } from "@/types/fetch";
import { redirect } from "next/navigation";

export async function Logout(): Promise<FetchState> {
    try {
        // use server로 서버에서 fetch 전송 (getAccessToken, deleteAccessToken 사용은 서버에서만 가능)
        const token = await getAccessToken();
        await fetchServer.post<ResponseLogout>('/auth/logout', token);
        await deleteAccessToken();
    } catch (error) {
        return { error: "로그아웃에 실패했습니다" }
    }

    redirect("/"); // 로그아웃 성공시 홈으로 이동
}