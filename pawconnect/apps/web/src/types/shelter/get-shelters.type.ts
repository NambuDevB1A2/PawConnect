import { ApiResponse } from "@/types/response.type";
import { Shelter } from "@/types/shelter.type";

export interface ResponseShelters extends ApiResponse{
    shelters?: Shelter[];
}