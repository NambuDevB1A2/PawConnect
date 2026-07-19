'use server';

import { deleteAccessToken, getAccessToken } from "@/services/auth/auth";
import { fetchServer } from "@/services/fetch/fetch.server";
import { ResponseLogout } from "@/types/auth/logout.type";
import { redirect } from "next/navigation";

export async function Logout() {
    try {
        const token = await getAccessToken();
        await fetchServer.post<ResponseLogout>('/auth/logout', token);
        await deleteAccessToken();
    } catch (error) {
        
    }

    console.log(`login 성공`);
    redirect("/");
}