'use server';

import { setAccessToken } from "@/services/auth/auth";
import { fetchServer } from "@/services/fetch/fetch.server";
import { LoginState, ResponseLogin } from "@/types/auth/login.type";

export async function Login(prevState: LoginState, formdata: FormData): Promise<LoginState> {
    const email = formdata.get('email') as string;
    const password = formdata.get('password') as string;

    if (!email || !password) {
        return {
            email, // 이메일 값 초기화 방지, 이전 이메일 값 저장
            emailError: !email ? "이메일을 입력해주세요" : "", // 이메일 에러 발생시 
            passwordError: !password? "비밀번호를 입력해주세요" : "", // 비밀번호 에러 발생시
        };
    }

    try {
        // server용 fetch 사용
        // use server로 서버에서 fetch 전송 (setAccessToken 사용은 서버에서만 가능)
        const result = await fetchServer.post<ResponseLogin>('/auth/login', undefined, {
            email,
            password,
        });
        
        // 토큰 저장
        await setAccessToken(result.accessToken);

        return { response: result }
    } catch (error) {
        return {
            email,
            emailError: "이메일 또는 비밀번호가 일치하지 않습니다",
        };
    }

}