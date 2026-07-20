import { fetchClient } from "@/services/fetch/fetch.client";

export async function HelloWorld() {
    try {
        const result = await fetchClient.get<{result: string}>('/');
        console.log(result.result);
    } catch (error) {
        
    }
}