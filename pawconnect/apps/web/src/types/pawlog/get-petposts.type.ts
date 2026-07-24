import { PetPost } from "@/types/pawlog/petpost.type";
import { ApiResponse, PaginationResponse } from "@/types/response.type";

export interface ResponsePetPosts extends ApiResponse{
    petPosts?: PetPost[];
    pagination?: PaginationResponse;
}