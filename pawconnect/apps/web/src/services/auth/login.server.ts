'use server';

import { getAccessToken, setAccessToken } from "@/services/auth/auth";
import { fetchServer } from "@/services/fetch/fetch.server";
import { LoginState, ResponseLogin } from "@/types/auth/login.type";
import { redirect } from "next/navigation";

export async function Login(prevState: LoginState, formdata: FormData): Promise<LoginState> {
    const email = formdata.get('email') as string;
    const password = formdata.get('password') as string;

    if (!email || !password) {
        return {
            email,
            emailError: !email ? "이메일을 입력해주세요" : "",
            passwordError: !password? "비밀번호를 입력해주세요" : "",
        };
    }

    try {
        const result = await fetchServer.post<ResponseLogin>('/auth/login', undefined, {
            email,
            password,
        });
        
        await setAccessToken(result.accessToken);
    } catch (error) {
        return {
            email,
            emailError: "이메일 또는 비밀번호가 일치하지 않습니다",
        };
    }

    console.log(`login 성공`);
    redirect("/");
}