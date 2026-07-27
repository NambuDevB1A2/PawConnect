import { ApiResponse } from "@/types/response.type";

export interface UpdateShelterState {
    addressError?: string;
    addressDetailError?: string;
    phoneError?: string;
    imgBannerError?: string;
    imgShelterError?: string;

    response?: ApiResponse;
}