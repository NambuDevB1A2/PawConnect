import { ApiResponse } from "@/types/response.type";
import { User } from "@/types/auth/user.type";

export interface ResponseMe extends ApiResponse {
    user: User;
}