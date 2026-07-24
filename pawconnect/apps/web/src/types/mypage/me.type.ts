import { ApiResponse } from "@/types/response.type";
import { User } from "@/types/user.type";

export interface ResponseMe extends ApiResponse {
    user: User;
}