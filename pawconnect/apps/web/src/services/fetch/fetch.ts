import { ENV } from "@/constants/env";
import { redirect } from "next/navigation";

function buildUrl(path: string) {
    const base = (ENV.API_URL ?? "").replace(/\/+$/, "");
    const cleanPath = path.replace(/^\/+/, "");
    return URL.parse(`${base}/${cleanPath}`);
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
            // 401 에러 발생시 login 화면으로 이동
            redirect('/login');
        }

        throw new Error(`HTTP Error: ${response.status}`);
    }

    if (response.status === 204){
        return undefined as T;
    }

    return response.json();
}