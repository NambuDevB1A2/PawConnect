import { Adoption } from "@/types/adopt/adoption.type";
import { ApiResponse } from "@/types/response.type";

export interface ResponseAdoption extends ApiResponse{
    adoption: Adoption;
}