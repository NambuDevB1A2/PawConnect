import { fetchData, resolveBody } from "@/services/fetch/fetch";

export const fetchServer = {
    get: <T>(url: string, token?: string, revalidate?: number | false) =>
        fetchData<T>(url, token, {
            next: {
                revalidate: revalidate ?? 60,
                tags: url.split('/').filter(Boolean),
            }
        }),

    post: <T>(url: string, token?: string, body?: any) =>
        fetchData<T>(url, token, {
            method: "POST",
            body: resolveBody(body),
            cache: "no-store",
        }),

    patch: <T>(url: string, token?: string, body?: any) =>
        fetchData<T>(url, token, {
            method: "PATCH",
            body: resolveBody(body),
            cache: "no-store",
        }),

    delete: <T>(url: string, token?: string) =>
        fetchData<T>(url, token, {
            method: "DELETE",
            cache: "no-store",
        }),
};
