import { ApiResponse, PaginationResponse } from "@/types/response.type";
import { Shelter } from "@/types/shelter/shelter.type";

export interface ResponseShelters extends ApiResponse{
    shelters?: Shelter[];
    pagination?: PaginationResponse;
}