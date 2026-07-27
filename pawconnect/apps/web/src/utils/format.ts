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