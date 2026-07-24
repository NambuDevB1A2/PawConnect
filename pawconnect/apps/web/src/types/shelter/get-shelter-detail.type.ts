import { ApiResponse } from "@/types/response.type";
import { Shelter } from "@/types/shelter/shelter.type";

export interface ResponseShelterDetail extends ApiResponse{
    shelter: Shelter;
}