function buildUrl(path: string) {
    const base = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");
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
            // TODO
            throw new Error(`Authorization Error`);
        }

        throw new Error(`HTTP Error: ${response.status}`);
    }

    if (response.status === 204){
        return undefined as T;
    }

    return response.json();
}