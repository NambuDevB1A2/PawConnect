'use server';

import { ApiError } from "@/services/fetch/api-error";
import { fetchServer } from "@/services/fetch/fetch.server";
import { getAccessToken } from "@/services/auth/auth";
import { ChangePasswordState } from "@/types/mypage/change-password.type";
import { ApiResponse } from "@/types/response.type";
import { validatePassword, validateRePassword } from "@/utils/auth/auth.validator";

export async function ChangePassword(prevState: ChangePasswordState, formdata: FormData): Promise<ChangePasswordState> {
    const prevPassword = formdata.get('prevPassword') as string;
    const newPassword = formdata.get('newPassword') as string;
    const newRePassword = formdata.get('newRePassword') as string;

    // 1. 값 유무 검사
    if (!prevPassword || !newPassword || !newRePassword) {
        return {
            prevPasswordError: !prevPassword? "비밀번호를 입력해주세요" : "",
            newPasswordError: !newPassword ? "비밀번호를 입력해주세요" : "",
            newRePasswordError: !newRePassword ? "비밀번호를 다시 입력해주세요" : "",
        };
    }

    // 2. 유효성 검사
    const newPasswordError = validatePassword(newPassword);
    const newRePasswordError = validateRePassword(newPassword, newRePassword);

    if (newPasswordError || newRePasswordError) {
        return {
            newPasswordError,
            newRePasswordError,
        };
    }

    if (prevPassword === newPassword) {
        return {
            newPasswordError: "변경 전과 동일한 비밀번호는 사용할 수 없습니다",
        };
    }

    try {
        const token = await getAccessToken();
        const result = await fetchServer.patch<ApiResponse>('/users/password', token, {
            prevPassword,
            newPassword,
            newRePassword,
        });

        return { response: result };
    } catch (error) {
        if (error instanceof ApiError && error.fields) {
            return {
                prevPasswordError: error.fields.prevPassword,
                newPasswordError: error.fields.newPassword,
                newRePasswordError: error.fields.newRePassword,
            };
        }

        // 필드 정보 없는 일반 에러 매핑 (네트워크 오류 등)
        return {
            prevPasswordError: "비밀번호 변경 도중 오류가 발생했습니다",
        };
    }
}
