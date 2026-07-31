import { fetchClient } from "../fetch/fetch.client";


// 보호동물 삭제
export async function DeleteAnimal(id: number) {
    try{
        return await fetchClient.delete<{success:Boolean}>(
            `/animals/${id}`
        );
    } catch(error) {
        console.log(error);
        return undefined;
    }
}