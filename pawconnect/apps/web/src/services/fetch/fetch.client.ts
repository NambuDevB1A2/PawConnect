import { fetchData } from "@/services/fetch/fetch";

export const fetchClient = {
    get: <T>(url: string) =>
        fetchData<T>(url, undefined, {
            credentials: "include",
            cache: "no-store",
        }),

    post: <T>(url: string, body?: any) =>
        fetchData<T>(url, undefined, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(body),
            cache: "no-store",
        }),

    patch: <T>(url: string, body?: any) =>
        fetchData<T>(url, undefined, {
            method: "PATCH",
            credentials: "include",
            body: JSON.stringify(body),
            cache: "no-store",
        }),

    delete: <T>(url: string) =>
        fetchData<T>(url, undefined, {
            method: "DELETE",
            credentials: "include",
            cache: "no-store",
        }),
};
