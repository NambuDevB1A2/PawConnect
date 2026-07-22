import { ApiError } from "@/services/fetch/api-error";
import { fetchClient } from "@/services/fetch/fetch.client";
import { RegisterShelterState, ResponseRegisterShelter } from "@/types/auth/register.type";
import { validateAgreedToTerms, validateNickname, validatePassword, validateRePassword, validateShelterAdress, validateShelterName, validateShelterPhone } from "@/utils/auth/auth.validator";

export async function RegisterShelter(prevState: RegisterShelterState, formdata: FormData): Promise<RegisterShelterState> {
    const email = formdata.get('email') as string;
    const password = formdata.get('password') as string;
    const rePassword = formdata.get('rePassword') as string;
    const nickname = formdata.get('nickname') as string;
    const imgProfile = formdata.get('imgProfile') as File;
    const agreedToTerms = formdata.get('agreedToTerms') as string === "on";

    const name = formdata.get('name') as string;
    const address = formdata.get('address') as string;
    const addressDetail = formdata.get('addressDetail') as string;
    const phone = formdata.get('phone') as string;
    const operatingHours  = formdata.get('operatingHours') as string;
    const description   = formdata.get('description') as string;
    const imgBanner = formdata.get('imgProfile') as File;
    const imgShelter = formdata.getAll('imgProfile') as File[];

    console.log(name, address, phone);

    // 1. 값 유무 검사
    if (!email || !password || !nickname ||
        !name || !address || !phone
    ) {
        return {
            email,
            nickname,

            emailError: !email ? "이메일을 입력해주세요" : "", 
            nicknameError: !nickname ? "닉네임을 입력해주세요" : "",
            passwordError: !password? "비밀번호를 입력해주세요" : "",
            rePasswordError: !rePassword ? "비밀번호를 다시 입력해주세요" : "",

            name,
            address,
            addressDetail,
            phone,
            operatingHours,
            description,
            nameError: !name ? "보호소 이름을 입력해주세요" : "",
            addressError: !address ? "주소를 입력해주세요" : "",
            phoneError: !phone ? "전화번호를 입력해주세요" : "",
        };
    }
    
    // 2. 유효성 검사
    const passwordError = validatePassword(password);
    const rePasswordError = validateRePassword(password, rePassword);
    const nicknameError = validateNickname(nickname);
    const agreedToTermsError = validateAgreedToTerms(agreedToTerms);

    const nameError = validateShelterName(name);
    const addressError = validateShelterAdress(address);
    const addressDetailError = validateShelterAdress(address);
    const phoneError = validateShelterPhone(phone);

    if (passwordError || rePasswordError || nicknameError || agreedToTermsError) {
        return {
            email,
            nickname,
            passwordError,
            rePasswordError,
            nicknameError,
            emailError: agreedToTermsError,

            name,
            address,
            addressDetail,
            phone,
            operatingHours,
            description,
            nameError,
            addressError,
            addressDetailError,
            phoneError,
        };
    }

    try {
        // FormData로 fetchClient 전송
        const submitData = new FormData();
        submitData.append('email', email);
        submitData.append('password', password);
        submitData.append('nickname', nickname);
        submitData.append('agreedToTerms', agreedToTerms ? "true" : "false");
        if (imgProfile && imgProfile.size > 0) submitData.append('imgProfile', imgProfile);
        
        submitData.append('name', name);
        submitData.append('address', address);
        submitData.append('addressDetail', addressDetail);
        submitData.append('phone', phone);
        submitData.append('operatingHours', operatingHours);
        submitData.append('description', description);
        if (imgBanner && imgBanner.size > 0) submitData.append('imgBanner', imgBanner);
        if (imgShelter.length > 0) imgShelter.forEach((file) => { if (file.size > 0) submitData.append('imgShelter', file); })

        const result = await fetchClient.post<ResponseRegisterShelter>('/auth/register/shelter', submitData);
        
        // Response를 state에 담아서 반환
        return { response: result };
    } catch (error) {
        console.log(error);

        if (error instanceof ApiError && error.fields) {
            // 서버에서 온 필드별 에러 매핑
            return {
                email,
                nickname,
                emailError: error.fields.email || error.fields.agreedToTerms,
                passwordError: error.fields.password,
                nicknameError: error.fields.nickname,
                imgProfileError: error.fields.imgProfile,
                
                name,
                address,
                addressDetail,
                phone,
                operatingHours,
                description,
                nameError: error.fields.name,
                addressError: error.fields.address,
                addressDetailError: error.fields.addressDetail,
                phoneError: error.fields.phone,
                operatingHoursError: error.fields.operatingHours,
                descriptionError: error.fields.description,
            };
        }

        // 필드 정보 없는 일반 에러 매핑 (네트워크 오류 등)
        return {
            email,
            nickname,
            emailError: "회원가입 도중 오류가 발생했습니다",
            
            name,
            address,
            addressDetail,
            phone,
            operatingHours,
            description,
        };
    }
}