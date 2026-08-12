import { AnimalGender, AnimalStatus } from "./animal.type";

export interface AnimalFilterParams {
    keyword?: string;
    species?: number;
    breed?: number;
    gender?: AnimalGender;
    isNeutered?: boolean;
    ageFilter?: number;
    status?: AnimalStatus;
}