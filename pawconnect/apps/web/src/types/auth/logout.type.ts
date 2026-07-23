import { ApiResponse } from "@/types/response.type";

export interface ResponseLogout extends ApiResponse {
    login: boolean
}