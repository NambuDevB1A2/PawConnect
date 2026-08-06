import { User } from "@/types/auth/user.type";
import { ApiResponse } from "@/types/response.type";
import { Shelter, ShelterImage } from "@/types/shelter/shelter.type";

export interface ResponseRegisterUser extends ApiResponse {
    user: User;
}

export interface RegisterUserState {
    email?: string;
    emailError?: string;
    nickname?: string;
    nicknameError?: string;
    passwordError?: string;
    rePasswordError?: string;
    imgProfileError?: string;

    termsError?: string;

    response?: ResponseRegisterUser;
}

export interface ResponseRegisterShelter extends ApiResponse {
    user: User;
    shelter: Shelter;
    shelterImages: ShelterImage[];
}

export interface RegisterShelterState {
    email?: string;
    emailError?: string;
    nickname?: string;
    nicknameError?: string;
    passwordError?: string;
    rePasswordError?: string;
    imgProfileError?: string;
    
    name?: string;
    nameError?: string;
    address?: string;
    addressError?: string;
    addressDetail?: string;
    addressDetailError?: string;
    phone?: string;
    phoneError?: string;
    operatingHours?: string;
    operatingHoursError?: string;
    description?: string;
    descriptionError?: string;
    imgBannerError?: string;
    imgShelterError?: string;
    
    termsError?: string;

    response?: ResponseRegisterShelter;
}