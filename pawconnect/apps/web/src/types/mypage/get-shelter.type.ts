import { ApiResponse } from "@/types/response.type";
import { Shelter } from "@/types/shelter.type";

export interface ResponseShelter extends ApiResponse{
    shelter?: Shelter;
}