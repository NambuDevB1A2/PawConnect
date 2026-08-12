import { ApiResponse } from "@/types/response.type";

export interface ResponseCreateAdoption extends ApiResponse {
    adoptionId: string;
}

export interface CreateAdoptionState {
    errorMessage?: string;
    
    userName?: string;
    userNameError?: string;
    phone?: string;
    phoneError?: string;
    email?: string;
    emailError?: string;
    address?: string;
    addressError?: string;
    addressDetail?: string;
    addressDetailError?: string;
    
    petExperience?: string;
    petExperienceError?:string;
    petsDescription?: string;
    petsDescriptionError?: string;
    petExperiencePeriod?: string;
    petExperiencePeriodError?: string;
    residenceType?: string;
    residenceTypeError?: string;
    petAllowedStatus?: string;
    petAllowedStatusError?: string;
    familySize?: string;
    familySizeError?: string;
    youngChildStatus?: string;
    youngChildStatusError?: string;
    isFamilyConsent?: string;
    isFamilyConsentError?: string;

    adoptionPurpose?: string;
    adoptionPurposeError?: string;
    isCanVaccinate?: string;
    isCanVaccinateError?: string;
    isCanProvideMedicalCare?: string;
    isCanProvideMedicalCareError?: string;
    isCanProvideExercise?: string;
    isCanProvideExerciseError?: string;
    isAcceptLifetimeResponsibility?: string;
    isAcceptLifetimeResponsibilityError?: string;
    additionalNotes?: string;
    additionalNotesError?: string;

    agreedToTermsError?: string;
    agreedToAdoptionError?: string;

    response?: ResponseCreateAdoption;
}