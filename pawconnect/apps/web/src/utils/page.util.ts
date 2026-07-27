export function parsePageToNumber(page?: string) {
    if (!page || isNaN(Number(page))) return 1;

    return Number(page);
}