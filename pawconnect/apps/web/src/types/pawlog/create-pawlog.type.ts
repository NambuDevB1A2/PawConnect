import { ApiResponse } from "@/types/response.type";

export interface ResponseCreatePawLog extends ApiResponse {
    pawLogId: number;
}

export interface CreatePawLogSate {
    title?: string;
    titleError?: string;
    content?: string;
    contentError?: string;
    imgPawLogError?: string;

    response?: ResponseCreatePawLog;
}