import { ApiError } from "@/services/fetch/api-error";
import { fetchClient } from "@/services/fetch/fetch.client";
import { UpdateUserState } from "@/types/mypage/update-user.type";
import { ApiResponse } from "@/types/response.type";
import { validateNickname } from "@/utils/auth/auth.validator";

export async function UpdateUser(prevState: UpdateUserState, formdata: FormData): Promise<UpdateUserState> {
    const nickname = formdata.get('nickname') as string;
    const imgProfile = formdata.get('imgProfile') as File;
    const imgProfileRemoved = formdata.get('imgProfileRemoved') as string === "true";

    // 1. 값 유무 검사
    if (!nickname && !imgProfile && !imgProfileRemoved) {
        return {
            nicknameError: "변경사항이 없습니다",
        };
    }

    // 2. 유효성 검사
    const nicknameError = validateNickname(nickname);

    if (nicknameError) {
        return {
            nicknameError,
        };
    }

    try {
        const submitData = new FormData();
        submitData.append('nickname', nickname);
        if (imgProfile && imgProfile.size > 0) submitData.append('imgProfile', imgProfile);
        submitData.append('imgProfileRemoved', imgProfileRemoved ? "true" : "false");

        const result = await fetchClient.patch<ApiResponse>('/users/me', submitData);

        console.log(result);
        
        return { response: result };
    } catch (error) {
        if (error instanceof ApiError && error.fields) {
            return {
                nicknameError: error.fields.nickname,
                imgProfileError: error.fields.imgProfile,
            };
        }

        // 필드 정보 없는 일반 에러 매핑 (네트워크 오류 등)
        return {
            nicknameError: "정보 변경 도중 오류가 발생했습니다",
        };
    }
}