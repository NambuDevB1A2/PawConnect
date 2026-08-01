import NotFound from "@/components/common/NotFound";
import Typography from "@/components/common/Typography";
import AnimalForm from "@/components/mypage/shelter/Animal-manage/AnimalForm";
import { getAnimalDetail } from "@/services/paw/get-animal-detail.server";

interface PageProps{
    params: Promise<{id:string}>;
}

// 보호동물 수정페이지
export default async function Page({params} : PageProps) {
    const {id} = await params;
    const response = await getAnimalDetail(Number(id));
    if(!response) return <NotFound />

    return (
        <div>
            <Typography variant="title">보호동물 수정</Typography>
            {/* 애니멀폼 가져오기 */}
            <AnimalForm mode="edit" animal={response.animal} />          
        </div>
    );
}