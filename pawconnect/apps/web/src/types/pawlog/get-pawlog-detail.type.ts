import { PawLog } from "@/types/pawlog/pawlog.type";
import { ApiResponse } from "@/types/response.type";

export interface ResponsePawLogDetail extends ApiResponse{
    pawLog?: PawLog;
}