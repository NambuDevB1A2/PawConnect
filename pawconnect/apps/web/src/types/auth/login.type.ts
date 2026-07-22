import { ApiResponse } from "@/types/response.type";

export interface ResponseLogin extends ApiResponse {
    login: boolean,
    accessToken: string,
}

export interface LoginState {
    email?: string;
    emailError?: string;
    passwordError?: string;

    response?: ResponseLogin;
}