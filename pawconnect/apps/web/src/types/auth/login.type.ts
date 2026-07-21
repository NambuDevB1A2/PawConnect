export interface ResponseLogin {
    login: boolean,
    accessToken: string,
}

export interface LoginState {
    email?: string;
    emailError?: string;
    passwordError?: string;
}