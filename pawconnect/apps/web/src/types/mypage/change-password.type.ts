import { ApiResponse } from "@/types/response.type";

export interface ChangePasswordState {
    prevPasswordError?: string;
    newPasswordError?: string;
    newRePasswordError?: string;

    response: ApiResponse;
}