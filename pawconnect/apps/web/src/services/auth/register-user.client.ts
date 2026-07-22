import { ApiError } from "@/services/fetch/api-error";
import { fetchClient } from "@/services/fetch/fetch.client";
import { RegisterUserState, ResponseRegisterUser } from "@/types/auth/register.type";
import { validateAgreedToTerms, validateNickname, validatePassword, validateRePassword } from "@/utils/auth/auth.validator";

export async function RegisterUser(prevState: RegisterUserState, formdata: FormData): Promise<RegisterUserState> {
    const email = formdata.get('email') as string;
    const password = formdata.get('password') as string;
    const rePassword = formdata.get('rePassword') as string;
    const nickname = formdata.get('nickname') as string;
    const imgProfile = formdata.get('imgProfile') as File;
    const agreedToTerms = formdata.get('agreedToTerms') as string === "on";

    // 1. 값 유무 검사
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

    // 2. 유효성 검사
    const passwordError = validatePassword(password);
    const rePasswordError = validateRePassword(password, rePassword);
    const nicknameError = validateNickname(nickname);
    const agreedToTermsError = validateAgreedToTerms(agreedToTerms);

    if (passwordError || rePasswordError || nicknameError || agreedToTermsError) {
        return {
            email,
            nickname,
            passwordError,
            rePasswordError,
            nicknameError,
            emailError: agreedToTermsError,
        };
    }

    try {
        // FormData로 fetchClient 전송
        const submitData = new FormData();
        submitData.append('email', email);
        submitData.append('password', password);
        submitData.append('nickname', nickname);
        submitData.append('agreedToTerms', agreedToTerms ? "true" : "false");
        if (imgProfile && imgProfile.size > 0) submitData.append('imgProfile', imgProfile);

        const result = await fetchClient.post<ResponseRegisterUser>('/auth/register/user', submitData);
        
        // Response를 state에 담아서 반환
        return { response: result };
    } catch (error) {
        console.log(error);

        if (error instanceof ApiError && error.fields) {
            // 서버에서 온 필드별 에러 매핑
            return {
                email,
                nickname,
                emailError: error.fields.email || error.fields.agreedToTerms,
                passwordError: error.fields.password,
                nicknameError: error.fields.nickname,
                imgProfileError: error.fields.imgProfile,
            };
        }

        // 필드 정보 없는 일반 에러 매핑 (네트워크 오류 등)
        return {
            email,
            nickname,
            emailError: "회원가입 도중 오류가 발생했습니다",
        };
    }
}