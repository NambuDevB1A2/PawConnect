import { ENV } from "@/constants/env";

function buildUrl(path: string) {
    const base = (ENV.API_URL ?? "").replace(/\/+$/, "");
    const cleanPath = path.replace(/^\/+/, "");
    return new URL(`${base}/${cleanPath}`);
}

export async function fetchData<T>(url: string, token?: string, options?: RequestInit) : Promise<T> {
    const apiUrl = buildUrl(url);

    console.log(`fetch: [${options?.method ?? "GET"}] ${apiUrl}`);

    if (!apiUrl) {
        throw new Error(`Invalid URL: ${url}`);
    }

    const response = await fetch(apiUrl, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token 
                ? { Authorization: `Bearer ${token}` }
                : {}),
            ...options?.headers,
        }
    });

    if (!response.ok) {
        if (response.status === 401) {
            // TODO: 401 에러 발생시 예외처리 
            throw new Error(`Unauthorized Error: ${response.status} ${response.message}`);
        }

        throw new Error(`HTTP Error: ${response.status} ${response.message}`);
    }

    if (response.status === 204){
        return undefined as T;
    }

    return response.json();
}