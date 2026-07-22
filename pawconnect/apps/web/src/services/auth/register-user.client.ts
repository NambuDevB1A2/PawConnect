import { fetchClient } from "@/services/fetch/fetch.client";
import { RegisterUserState, ResponseRegisterUser } from "@/types/auth/register.type";

export async function RegisterUser(prevState: RegisterUserState, formdata: FormData): Promise<RegisterUserState> {
    const email = formdata.get('email') as string;
    const password = formdata.get('password') as string;
    const rePassword = formdata.get('rePassword') as string;
    const nickname = formdata.get('nickname') as string;
    const imgProfile = formdata.get('imgProfile') as File;

    if (!email || !password || !nickname) {
        return {
            email,
            nickname,
            emailError: !email ? "이메일을 입력해주세요" : "", 
            nicknameError: !nickname ? "닉네임을 입력해주세요" : "",
            passwordError: !password? "비밀번호를 입력해주세요" : "",
            rePasswordError: !rePassword ? "비밀번호를 다시 입력해주세요" : "",
        };
    }

    if (password !== rePassword) {
        return {
            email,
            nickname,
            rePasswordError: "비밀번호가 일치하지 않습니다",
        };
    }

    try {
        const submitData = new FormData();
        submitData.append('email', email);
        submitData.append('password', password);
        submitData.append('nickname', nickname);
        if (imgProfile && imgProfile.size > 0) {
            submitData.append('imgProfile', imgProfile);
        }

        const result = await fetchClient.post<ResponseRegisterUser>('/auth/register/user', submitData);
        return { response: result };
    } catch (error) {
        return {
            email,
            nickname,
            emailError: "회원가입 도중 오류가 발생했습니다",
        };
    }
}