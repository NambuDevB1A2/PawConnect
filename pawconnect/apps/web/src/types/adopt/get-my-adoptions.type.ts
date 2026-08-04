import { Adoption } from "@/types/adopt/adoption.type";
import { ApiResponse, PaginationResponse } from "@/types/response.type";

export interface ResponseMyAdoptions extends ApiResponse{
    adoptions?: Adoption[];
    pagination?: PaginationResponse;
}