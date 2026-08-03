import badgeStyles from "@/styles/common/Badge.module.css";
import { Animal } from "@/types/paw/animal.type";
import { Shelter } from "@/types/shelter/shelter.type";
import { BadgeVariant } from '../../components/common/Badge';

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
    adoptionStatus: string;
    createdAt: string;
    updatedAt: string;

    animal: AdoptionAnimal;
}
