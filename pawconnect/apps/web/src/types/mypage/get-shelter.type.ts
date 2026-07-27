import { ApiResponse } from "@/types/response.type";
import { Shelter } from "@/types/shelter/shelter.type";

export interface ResponseShelter extends ApiResponse{
    shelter: Shelter;
}