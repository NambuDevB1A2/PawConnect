import { ApiError } from "@/services/fetch/api-error";
import { fetchClient } from "@/services/fetch/fetch.client";
import { UpdateShelterState } from "@/types/mypage/update-shelter.type";
import { ApiResponse } from "@/types/response.type";
import { validateShelterAddress, validateShelterPhone } from "@/utils/auth/auth.validator";

export async function UpdateShelter(prevState: UpdateShelterState, formdata: FormData): Promise<UpdateShelterState> {
    const address = formdata.get('address') as string;
    const addressDetail = formdata.get('addressDetail') as string;
    const phone = formdata.get('phone') as string;
    const operatingHours  = formdata.get('operatingHours') as string;
    const description   = formdata.get('description') as string;
    const imgBanner = formdata.get('imgBanner') as File;
    const imgBannerRemoved = formdata.get('imgBannerRemoved') as string === "true";
    const imgShelter = formdata.getAll('imgShelter') as File[];
    const imgShelterKeeps = (formdata.get('imgShelterKeeps') as string).split(',').map((s) => s.trim()).filter((s) => s.length > 0);

    // 1. 값 유무 검사
    if (!address && !addressDetail && !phone && !operatingHours && !description &&
        !imgBanner && imgShelter.length === 0
    ) {
        return {
            addressError: "변경사항이 없습니다",
        };
    }
    
    // 2. 유효성 검사
    const addressError = validateShelterAddress(address);
    const addressDetailError = validateShelterAddress(address);
    const phoneError = validateShelterPhone(phone);

    if (addressError || addressDetailError || phoneError) {
        return {
            addressError,
            addressDetailError,
            phoneError,
        };
    }

    try {
        // FormData로 fetchClient 전송
        const submitData = new FormData();
        submitData.append('address', address);
        submitData.append('addressDetail', addressDetail);
        submitData.append('phone', phone);
        submitData.append('operatingHours', operatingHours);
        submitData.append('description', description);
        if (imgBanner && imgBanner.size > 0) submitData.append('imgBanner', imgBanner);
        submitData.append('imgBannerRemoved', imgBannerRemoved ? "true" : "false");
        if (imgShelter.length > 0) imgShelter.forEach((file) => { if (file.size > 0) submitData.append('imgShelter', file); });
        submitData.append('imgShelterKeeps', imgShelterKeeps.join(','));

        const result = await fetchClient.patch<ApiResponse>('/shelters/me', submitData);
        
        // Response를 state에 담아서 반환
        return { response: result };
    } catch (error) {
        if (error instanceof ApiError && error.fields) {
            // 서버에서 온 필드별 에러 매핑
            return {
                addressError: error.fields.address,
                addressDetailError: error.fields.addressDetail,
                phoneError: error.fields.phone,
                imgBannerError: error.fields.imgBanner,
                imgShelterError: error.fields.imgShelter,
            };
        }

        // 필드 정보 없는 일반 에러 매핑 (네트워크 오류 등)
        return {
            addressError: "보호소 정보 수정 도중 오류가 발생했습니다",
        };
    }
}