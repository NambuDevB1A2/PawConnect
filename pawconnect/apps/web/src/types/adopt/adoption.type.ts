import badgeStyles from "@/styles/common/Badge.module.css";
import { Animal } from "@/types/paw/animal.type";
import { Shelter } from "@/types/shelter/shelter.type";
import { BadgeVariant } from '../../components/common/Badge';
import { User } from "@/types/auth/user.type";

interface AdoptionAnimal extends Animal {

    animalSpecies: { 
        name: string;
    }
    animalBreed: {
        name: string;
    }

    shelter: Shelter;
}

export interface Adoption {
    id: string;
    userId: string;
    animalId: number;
    adoptionStatus: AdoptionStatus;
    createdAt: string;
    updatedAt: string;
    
    user: User;

    animal: AdoptionAnimal;

    detail: AdoptionDetail;
}

export interface AdoptionDetail {
    userName: string;
    phone: string;
    email: string;
    address: string;
    addressDetail: string;

    petExperience: string;
    petsDescription: string;
    petExperiencePeriod: string;

    residenceType: string;
    petAllowedStatus: string;
    familySize: string;
    youngChildStatus: string;
    isFamilyConsent: boolean;

    adoptionPurpose: string;
    isCanVaccinate: boolean;
    isCanProvideMedicalCare: boolean;
    isCanProvideExercise: boolean;
    isAcceptLifetimeResponsibility: boolean;
    additionalNotes: string;
}


// AdoptionStatus
export type AdoptionStatus =
    "PENDING"
    | "COUNSELING"
    | "INTERVIEW"
    | "ADDITIONAL_INTERVIEW"
    | "FOSTERING"
    | "FINAL_REVIEW"
    | "APPROVED"
    | "REJECTED"
    | "CANCELED";