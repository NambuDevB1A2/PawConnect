import { Animal } from "@/types/paw/animal.type";
import { ApiResponse } from "@/types/response.type";
import { Shelter } from "@/types/shelter/shelter.type";

export interface ResponseShelterDetail extends ApiResponse{
    shelter?: Shelter;
    animals?: Animal[];
}