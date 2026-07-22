import { User } from "@/types/auth/user.type";
import { ApiResponse } from "@/types/response.type";

export interface ResponseRegisterUser extends ApiResponse {
    user: User;
}

export interface RegisterUserState {
    email?: string;
    emailError?: string;
    nickname?: string;
    nicknameError?: string;
    passwordError?: string;
    rePasswordError?: string;
    imgProfileError?: string;

    response?: ResponseRegisterUser;
}