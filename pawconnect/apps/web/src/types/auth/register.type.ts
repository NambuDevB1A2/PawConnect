import { User } from "@/types/auth/user.type";

export interface ResponseRegisterUser {
    user: User;
    success: boolean;
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