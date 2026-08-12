import NotFound from "@/components/common/NotFound";
import AnimalForm from "@/components/mypage/shelter/Animal-manage/AnimalForm";
import { getAnimalDetail } from "@/services/paw/get-animal-detail.server";
import styles from "@/styles/mypage/shelter/animalForm.module.css";

interface PageProps{
    params: Promise<{id:string}>;
}

// 보호동물 수정페이지
export default async function Page({params} : PageProps) {
    const {id} = await params;
    const response = await getAnimalDetail(Number(id));
    if(!response) return <NotFound />

    return (
        <div className={styles.wrapper_edit}>
            <AnimalForm mode="edit" animal={response.animal} />
        </div>
    );
}
