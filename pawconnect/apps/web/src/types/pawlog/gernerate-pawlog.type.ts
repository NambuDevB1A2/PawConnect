import { ApiResponse } from "@/types/response.type";

export interface ResponseGeneratePawLog extends ApiResponse {
    title: string;
    content: string;
}

export interface GeneratePawLogState {
    content?: string;
    contentError?: string;
    imgPawLogError?: string;

    response?: ResponseGeneratePawLog;
}