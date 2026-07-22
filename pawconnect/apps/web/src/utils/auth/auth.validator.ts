export function validatePassword(password: string) {
    if (password.length < 6) {
        return '비밀번호는 6자 이상이어야 합니다';
    }

    if (password.length > 30) {
        return '비밀번호는 30자 이하여야 합니다'
    }

    const hasLowercase = /[a-z]/.test(password);
    if (!hasLowercase) {
        return '영문 소문자를 포함해주세요';
    }

    const hasUpperCase = /[A-Z]/.test(password);
    if (!hasUpperCase) {
        return '영문 대문자를 포함해주세요';
    }

    const hasNumber = /[0-9]/.test(password);
    if (!hasNumber) {
        return '최소 1자 이상의 숫자를 포함해주세요';
    }

    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    if (!hasSpecialChar) {
        return '최소 1자 이상의 특수문자를 포함해주세요';
    }

    return undefined;
}

export function validateRePassword(password: string, rePassword: string) {
    if (password !== rePassword) {
        return '비밀번호가 일치하지 않습니다';
    }

    return undefined;
}

export function validateNickname(nickname: string) {
    if (nickname.length < 2) {
        return '닉네임은 2자 이상이어야 합니다';
    }

    if (nickname.length > 16) {
        return '닉네임은 16자 이하여야 합니다'
    }

    const validPattern = /^[가-힣a-zA-Z0-9]+$/;
    if (!validPattern.test(nickname)) {
        return "닉네임에 공백 또는 특수문자를 사용할 수 없습니다";
    }
    
    return undefined;
}

export function validateAgreedToTerms(agreedToTerms: boolean) {
    if (!agreedToTerms) {
        return '이용약관 및 개인정보 처리방침에 동의해주세요';
    }

    return undefined;
}

export function validateShelterName(name: string) {
    if (name.length > 100) {
        return '너무 긴 이름은 사용할 수 없습니다';
    }

    return undefined;
}

export function validateShelterAdress(address: string) {
    if (address.length > 255) {
        return '올바르지 않은 주소입니다';
    }

    return undefined;
}

export function validateShelterPhone(phone: string) {
    const validPattern = /^[0-9]+$/;
    if (!validPattern.test(phone)) {
        return "올바르지 않은 전화번호입니다";
    }

    return undefined;
}