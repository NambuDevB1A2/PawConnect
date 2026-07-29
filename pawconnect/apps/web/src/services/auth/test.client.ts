import { fetchClient } from "@/services/fetch/fetch.client";

export async function HelloWorld() {
    try {
        // client용 fetch 사용
        const result = await fetchClient.get<{result: string}>('/');
        console.log(result.result);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}