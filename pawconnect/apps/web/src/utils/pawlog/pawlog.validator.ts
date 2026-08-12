export function validateTitle(title: string) {
    if (title.length > 50) {
        return '너무 긴 제목은 사용할 수 없습니다';
    }

    return undefined;
}