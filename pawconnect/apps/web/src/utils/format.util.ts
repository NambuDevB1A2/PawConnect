export function formatDate(isoString: string): string {
    const date = new Date(isoString);

    const yy = String(date.getFullYear()).slice(2);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return `${yy}-${mm}-${dd}`;
}

export function formatDateTime(isoString?: string): string {
    if (!isoString) return "";
    
    const date = new Date(isoString);

    const yy = String(date.getFullYear()).slice(2);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    return `${yy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

export function formatPhoneNumber(phone?: string): string {
    if (!phone) return "";

    // 숫자만 추출 (하이픈, 공백 등 제거)
    const digits = phone.replace(/[^0-9]/g, '');

    // 02 지역번호 (서울)
    if (digits.startsWith('02')) {
        if (digits.length === 9) {
        // 02-123-4567 (구형, 총 9자리)
        return digits.replace(/^(\d{2})(\d{3})(\d{4})$/, '$1-$2-$3');
        }
        if (digits.length === 10) {
        // 02-1234-5678 (총 10자리)
        return digits.replace(/^(\d{2})(\d{4})(\d{4})$/, '$1-$2-$3');
        }
        return phone; // 형식에 안 맞으면 원본 반환
    }

    // 010, 011, 016~019 등 휴대폰 (11자리) 또는 지역번호(3자리) 유선전화
    if (digits.length === 11) {
        // 010-1234-5678
        return digits.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3');
    }
    if (digits.length === 10) {
        // 031-123-4567 같은 지역번호 유선전화 (총 10자리)
        return digits.replace(/^(\d{3})(\d{3})(\d{4})$/, '$1-$2-$3');
    }

    return phone; // 알 수 없는 형식은 원본 그대로 반환
}