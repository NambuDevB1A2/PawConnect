'use server';

import { ApiError } from "@/services/fetch/api-error";
import { fetchServer } from "@/services/fetch/fetch.server";
import { getAccessToken } from "@/services/auth/auth";
import { CreateAdoptionState, ResponseCreateAdoption } from "@/types/adopt/create-adoption.type";
import { validateAgreedToAdoption, validateAgreedToTerms, validateEmail, validateShelterAddress, validateShelterPhone } from "@/utils/auth/auth.validator";

export async function CreateAdoption(animalId: number, prevState: CreateAdoptionState, formdata: FormData): Promise<CreateAdoptionState> {
    const userName = formdata.get('userName') as string;
    const phone = formdata.get('phone') as string;
    const email = formdata.get('email') as string;
    const address = formdata.get('address') as string;
    const addressDetail = formdata.get('addressDetail') as string;

    const petExperience = formdata.get('petExperience') as string;
    const petsDescription = formdata.get('petsDescription') as string;
    const petExperiencePeriod = formdata.get('petExperiencePeriod') as string;
    const residenceType = formdata.get('residenceType') as string;
    const petAllowedStatus = formdata.get('petAllowedStatus') as string;
    const familySize = formdata.get('familySize') as string;
    const youngChildStatus = formdata.get('youngChildStatus') as string;
    const isFamilyConsent = formdata.get('isFamilyConsent') as string;

    const adoptionPurpose = formdata.get('adoptionPurpose') as string;
    const isCanVaccinate = formdata.get('isCanVaccinate') as string;
    const isCanProvideMedicalCare = formdata.get('isCanProvideMedicalCare') as string;
    const isCanProvideExercise = formdata.get('isCanProvideExercise') as string;
    const isAcceptLifetimeResponsibility = formdata.get('isAcceptLifetimeResponsibility') as string;
    const additionalNotes = formdata.get('additionalNotes') as string;

    const agreedToTerms = formdata.get('agreedToTerms') as string;
    const agreedToAdoption = formdata.get('agreedToAdoption') as string;

    // 1. 값 유무 검사
    if (!userName || !phone || !email || !address
        || !petExperience || !residenceType || !petAllowedStatus || !familySize
        || !youngChildStatus || !isFamilyConsent || !adoptionPurpose || !additionalNotes
    ) {
        return {
            userName,
            phone,
            email,
            address,
            addressDetail,

            petExperience,
            petsDescription,
            petExperiencePeriod,
            residenceType,
            petAllowedStatus,
            familySize,
            youngChildStatus,
            isFamilyConsent,

            adoptionPurpose,
            isCanVaccinate,
            isCanProvideMedicalCare,
            isCanProvideExercise,
            isAcceptLifetimeResponsibility,
            additionalNotes,

            userNameError: !userName ? "이름을 입력해주세요" : "",
            phoneError: !phone ? "전화번호를 입력해주세요" : "",
            emailError: !email ? "이메일을 입력해주세요" : "",
            addressError: !address ? "주소를 입력해주세요" : "",

            petExperienceError: !petExperience ? "값을 입력해주세요" : "",
            residenceTypeError: !residenceType ? "값을 입력해주세요" : "",
            petAllowedStatusError: !petAllowedStatus ? "값을 입력해주세요" : "",
            familySizeError: !familySize ? "값을 입력해주세요" : "",
            youngChildStatusError: !youngChildStatus ? "값을 입력해주세요" : "",
            isFamilyConsentError: !isFamilyConsent ? "값을 입력해주세요" : "",

            adoptionPurposeError: !adoptionPurpose ? "값을 입력해주세요" : "",
            additionalNotesError: !additionalNotes ? "값을 입력해주세요" : "",
        };
    }

    // 2. 유효성 검사
    const emailError = validateEmail(email);
    const phoneError = validateShelterPhone(phone);
    const addressError = validateShelterAddress(address);
    const addressDetailError = validateShelterAddress(addressDetail);
    const agreedToTermsError = validateAgreedToTerms(agreedToTerms === "on" || agreedToTerms === "true");
    const agreedToAdoptionError = validateAgreedToAdoption(agreedToAdoption === "on" || agreedToTerms === "true");

    if (emailError || phoneError || addressError || addressDetailError || agreedToTermsError || agreedToAdoptionError) {
        return {
            userName,
            phone,
            email,
            address,
            addressDetail,

            petExperience,
            petsDescription,
            petExperiencePeriod,
            residenceType,
            petAllowedStatus,
            familySize,
            youngChildStatus,
            isFamilyConsent,

            adoptionPurpose,
            isCanVaccinate,
            isCanProvideMedicalCare,
            isCanProvideExercise,
            isAcceptLifetimeResponsibility,
            additionalNotes,

            emailError,
            phoneError,
            addressError,
            addressDetailError,

            agreedToTermsError,
            agreedToAdoptionError,
        };
    }

    try {
        const token = await getAccessToken();
        const result = await fetchServer.post<ResponseCreateAdoption>('/adoptions', token, {
            animalId,

            userName,
            phone,
            email,
            address,
            addressDetail,

            petExperience,
            petsDescription,
            petExperiencePeriod,
            residenceType,
            petAllowedStatus,
            familySize,
            youngChildStatus,
            isFamilyConsent: isFamilyConsent === "true" ,

            adoptionPurpose,
            isCanVaccinate: isCanVaccinate === "on",
            isCanProvideMedicalCare: isCanProvideMedicalCare === "on",
            isCanProvideExercise: isCanProvideExercise === "on",
            isAcceptLifetimeResponsibility: isAcceptLifetimeResponsibility === "on",
            additionalNotes,

            agreements: [
                {
                    agreementId: 2,
                    isAgreed:agreedToTerms === "on",
                },
                {
                    agreementId: 3,
                    isAgreed:agreedToAdoption === "on",
                }
            ],
        });

        // Response를 state에 담아서 반환
        return { response: result };
    } catch (error) {
        if (error instanceof ApiError) {
            // 서버에서 온 필드별 에러 매핑
            return {
                userName,
                phone,
                email,
                address,
                addressDetail,

                petExperience,
                petsDescription,
                petExperiencePeriod,
                residenceType,
                petAllowedStatus,
                familySize,
                youngChildStatus,
                isFamilyConsent,

                adoptionPurpose,
                isCanVaccinate,
                isCanProvideMedicalCare,
                isCanProvideExercise,
                isAcceptLifetimeResponsibility,
                additionalNotes,

                userNameError: error.fields?.userName,
                phoneError: error.fields?.phone,
                emailError: error.fields?.email,
                addressError: error.fields?.address,
                addressDetailError: error.fields?.addressDetail,

                petExperienceError: error.fields?.petExperience,
                petsDescriptionError: error.fields?.petsDescription,
                petExperiencePeriodError: error.fields?.petExperiencePeriod,
                residenceTypeError: error.fields?.residenceType,
                petAllowedStatusError: error.fields?.petAllowedStatus,
                familySizeError: error.fields?.familySize,
                youngChildStatusError: error.fields?.youngChildStatus,
                isFamilyConsentError: error.fields?.isFamilyConsent,

                adoptionPurposeError: error.fields?.adoptionPurpose,
                isCanVaccinateError: error.fields?.isCanVaccinate,
                isCanProvideMedicalCareError: error.fields?.isCanProvideMedicalCare,
                isCanProvideExerciseError: error.fields?.isCanProvideExercise,
                isAcceptLifetimeResponsibilityError: error.fields?.isAcceptLifetimeResponsibility,
                additionalNotesError: error.fields?.additionalNotes,

                errorMessage: error.message,
            };
        }

        // 필드 정보 없는 일반 에러 매핑 (네트워크 오류 등)
        return {
            userName,
            phone,
            email,
            address,
            addressDetail,

            petExperience,
            petsDescription,
            petExperiencePeriod,
            residenceType,
            petAllowedStatus,
            familySize,
            youngChildStatus,
            isFamilyConsent,

            adoptionPurpose,
            isCanVaccinate,
            isCanProvideMedicalCare,
            isCanProvideExercise,
            isAcceptLifetimeResponsibility,
            additionalNotes,

            errorMessage: "신청서 작성 도중 오류가 발생했습니다",
        };
    }
}
