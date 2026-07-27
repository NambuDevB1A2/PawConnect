import { PawLog } from "@/types/pawlog/pawlog.type";
import { ApiResponse, PaginationResponse } from "@/types/response.type";

export interface ResponseMyPawLogs extends ApiResponse{
    pawLogs?: PawLog[];
    pagination?: PaginationResponse;
}