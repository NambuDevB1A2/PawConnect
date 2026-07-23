import { ApiResponse } from "@/types/response.type";

export interface FetchState {
    error?: string;

    response?: ApiResponse;
}