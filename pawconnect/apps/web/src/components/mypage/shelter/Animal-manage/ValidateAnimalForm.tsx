import { CreateAnimalForm } from "@/types/paw/animal.type";
import {
    validateAge,
    validateAnimalName,
    validateAnimalStatus,
    validateBreed,
    validateDescription,
    validateFoundLocation,
    validateGender,
    validateHealthStatus,
    validateNoticeDate,
    validateSpecialNotes,
    validateSpecies,
    validateWeight,
} from "@/utils/paw/paw.validator";


// 동물 제한 검증
export function validateAnimalForm(form: CreateAnimalForm) {

    return {
        nameError: validateAnimalName(form.name),
        speciesError: validateSpecies(form.speciesId),
        breedError: validateBreed(form.breedId),
        ageError: validateAge(form.age),
        weightError: validateWeight(form.weight),
        genderError: validateGender(form.gender),
        foundLocationError:
            validateFoundLocation(form.foundLocation),
        specialNotesError:
            validateSpecialNotes(form.specialNotes),
        descriptionError:
            validateDescription(form.description),
        healthStatusError:
            validateHealthStatus(form.healthStatus),
        noticeDateError:
            validateNoticeDate(form.noticeStartDate, form.noticeEndDate),
    };
}