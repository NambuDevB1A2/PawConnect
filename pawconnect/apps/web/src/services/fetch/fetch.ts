import { ENV } from "@/constants/env";
import { ApiError } from "@/services/fetch/api-error";

export function resolveBody(body?: any) {
    if (body instanceof FormData) return body;
    return body !== undefined ? JSON.stringify(body) : undefined;
}

function buildUrl(path: string) {
    const base = (ENV.API_URL ?? "").replace(/\/+$/, "");
    const cleanPath = path.replace(/^\/+/, "");
    return new URL(`${base}/${cleanPath}`);
}

export async function fetchData<T>(url: string, token?: string, options?: RequestInit) : Promise<T> {
    const apiUrl = buildUrl(url);

    console.log(`fetch: [${options?.method ?? "GET"}] ${apiUrl}`);

    const isFormData = options?.body instanceof FormData;

    const response = await fetch(apiUrl, {
        ...options,
        headers: {
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options?.headers,
        }
    });

    if (!response.ok) {
        const data = await response.json();

        if (response.status === 401) {
            // TODO: 401 에러 발생시 예외처리 
            return undefined as T
        }

        throw new ApiError(response.status, data?.message ?? "요청 중 오류가 발생했습니다", data?.fields);
    }

    if (response.status === 204){
        return undefined as T;
    }

    return response.json();
}