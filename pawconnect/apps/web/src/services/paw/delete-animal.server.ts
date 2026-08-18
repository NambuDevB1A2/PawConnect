'use server';

import { fetchServer } from "@/services/fetch/fetch.server";
import { getAccessToken } from "@/services/auth/auth";

// 보호동물 삭제
export async function DeleteAnimal(id: number) {
    try {
        const token = await getAccessToken();
        return await fetchServer.delete<{success:boolean}>(
            `/animals/${id}`, token
        );
    } catch(error) {
        console.log(error);
        return undefined;
    }
}
