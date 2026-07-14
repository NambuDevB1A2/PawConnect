export namespace Enums {

  export enum Role {
        GUEST = 'GUEST',
        USER = 'USER',
        SHELTER = 'SHELTER',
        ADMIN = 'ADMIN',
    };

    export enum UserStatus {
        ACTIVE = 'ACTIVE',
        INACTIVE = 'INACTIVE',
        SUSPENDED = 'SUSPENDED',
        WITHDRAWN = 'WITHDRAWN',
    };

    export enum AnimalStatus {
        PROTECTED = 'PROTECTED',
        AVAILABLE = 'AVAILABLE',
        ADOPTED = 'ADOPTED',
        REUNITED = 'REUNITED',
        DECEASED = 'DECEASED',
        EUTHANIZED = 'EUTHANIZED',
    };

    export enum AnimalGender {
        MALE = 'MALE',
        FEMALE = 'FEMALE',
        UNKNOWN = 'UNKNOWN',
    };


    export enum AdoptionStatus {
        PENDING = 'PENDING',
        COUNSELING = 'COUNSELING',
        INTERVIEW = 'INTERVIEW',
        ADDITIONAL_INTERVIEW = 'ADDITIONAL_INTERVIEW',
        FOSTERING = 'FOSTERING',
        FINAL_REVIEW = 'FINAL_REVIEW',
        APPROVED = 'APPROVED',
        REJECTED = 'REJECTED',
        CANCELED = 'CANCELED',
    };

    export enum PetExperience {
        NONE = 'NONE',
        PAST = 'PAST',
        CURRENT = 'CURRENT',
    };

    export enum PetExperiencePeriod {
        LESS_THAN_1_YEAR = 'LESS_THAN_1_YEAR',
        ONE_TO_THREE_YEARS = 'ONE_TO_THREE_YEARS',
        THREE_TO_FIVE_YEARS = 'THREE_TO_FIVE_YEARS',
        OVER_FIVE_YEARS = 'OVER_FIVE_YEARS',
    };


    export enum ResidenceType {
        APARTMENT = 'APARTMENT',
        VILLA = 'VILLA',
        DETACHED_HOUSE = 'DETACHED_HOUSE',
        OFFICETEL = 'OFFICETEL',
        DORMITORY = 'DORMITORY',
    };

    export enum PetAllowedStatus {
        ALLOWED = 'ALLOWED',
        NOT_ALLOWED = 'NOT_ALLOWED',
        NEED_CONFIRMATION = 'NEED_CONFIRMATION',
    };

    export enum FamilySize {
        ONE = 'ONE',
        TWO = 'TWO',
        THREE = 'THREE',
        FOUR_OR_MORE = 'FOUR_OR_MORE',
    };

    export enum YoungChildStatus {
        NONE = 'NONE',
        UNDER_SEVEN = 'UNDER_SEVEN',
        SEVEN_OR_OLDER = 'SEVEN_OR_OLDER',
    };

}