import { ApiResponse } from "@/types/response.type";

export interface ResponseUpdatePawLog extends ApiResponse {
    pawLogId: number;
}

export interface UpdatePawLogSate {
    title?: string;
    titleError?: string;
    content?: string;
    contentError?: string;
    imgPawLogError?: string;

    response?: ResponseUpdatePawLog;
}