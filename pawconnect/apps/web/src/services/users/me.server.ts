import { getAccessToken } from "@/services/auth/auth";
import { fetchServer } from "@/services/fetch/fetch.server";
import { ResponseMe } from "@/types/mypage/me.type";

export async function Me() {
    const token = await getAccessToken();

    try {
        return await fetchServer.get<ResponseMe>('/users/me', token, 0);
    } catch (error) {

    }
}