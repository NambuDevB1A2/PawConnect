import { User } from "@/types/auth/user.type";
import { ApiResponse } from "@/types/response.type";

export interface ResponseLogin extends ApiResponse {
    login: boolean,
    accessToken: string,
    user: User,
}

export interface LoginState {
    email?: string;
    emailError?: string;
    passwordError?: string;

    response?: ResponseLogin;
}