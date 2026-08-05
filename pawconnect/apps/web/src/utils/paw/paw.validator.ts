import { AnimalGender, AnimalStatus } from "@/types/paw/animal.type";

// 동물 이름 검증
export function validateAnimalName(name: string) {
    if (!name.trim()) {
        return "동물 이름을 입력해주세요";
    }

    if (name.length > 20) {
        return " 동물 이름은 20자 이하로 입력해주세요";
    }
    return "";
}


// 동물 종류 검증
export function validateSpecies(speciesId: number) {
    if (!speciesId) {
        return "동물 종류를 선택해주세요";
    }

    return "";
}


// 품종 검증
export function validateBreed(breedId: number) {
    if (!breedId) {
        return "품종을 선택해주세요";
    }

    return "";
}


// 성별 검증
export function validateGender(gender: AnimalGender) {
    if (!gender) {
        return "성별을 선택해주세요";
    }

    return "";
}


// 나이 검증
export function validateAge(age: number | "") {
    if (age === "") {
        return "나이를 입력해주세요";
    }

    if (age < 0) {
        return "나이는 0개월 이상이어야 합니다";
    }

    return "";
}


// 몸무게 검증
export function validateWeight(weight: number | "") {
    if (weight === "") {
        return "몸무게를 입력해주세요";
    }

    if (weight < 0) {
        return "몸무게는 0kg 이상이어야 합니다";
    }

    return "";
}


// 공고 날짜 검증
export function validateNoticeDate(
    startDate: string,
    endDate: string
) {

    if (!startDate || !endDate) {
        return "공고 기간을 입력해주세요";
    }

    if (new Date(startDate) > new Date(endDate)) {
        return "공고 종료일은 시작일 이후여야 합니다";
    }

    return "";
}


// 발견 장소 검증
export function validateFoundLocation(value: string) {

    if (!value.trim()) {
        return "발견 장소를 입력해주세요";
    }

    if (value.length > 50) {
        return "발견 장소는 50자 이하로 입력해주세요";
    }

    return "";
}


// 특이사항 검증
export function validateSpecialNotes(value: string) {

    if (value.length > 100) {
        return "특이사항은 100자 이하로 입력해주세요";
    }

    return "";
}


// 소개 검증
export function validateDescription(value: string) {

    if (!value.trim()) {
        return "동물 소개를 입력해주세요";
    }

    if (value.length > 500) {
        return "소개는 500자 이하로 입력해주세요";
    }

    return "";
}


// 건강상태 검증
export function validateHealthStatus(value: string) {

    if (!value.trim()) {
        return "건강 상태를 입력해주세요";
    }

    if (value.length > 500) {
        return "건강 상태는 500자 이하로 입력해주세요";
    }

    return "";
}


// 상태 검증
export function validateAnimalStatus(status: AnimalStatus) {

    if (!status) {
        return "동물 상태를 선택해주세요";
    }

    return "";
}