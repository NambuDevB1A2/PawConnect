import { ApiResponse } from "@/types/response.type";

export interface UpdateUserState {
    nickname?: string;
    nicknameError?: string;
    imgProfileError?: string;

    response: ApiResponse;
}