import { getAccessToken } from "@/services/auth/auth";
import { fetchServer } from "@/services/fetch/fetch.server";
import { User } from "@/types/user.type";

export async function Me() {
    const token = await getAccessToken();

    try {
        return await fetchServer.get<User>('/users/me', token, false);
    } catch (error) {

    }
}