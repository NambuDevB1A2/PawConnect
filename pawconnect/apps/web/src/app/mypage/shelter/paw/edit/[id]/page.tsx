import Typography from "@/components/common/Typography";
import AnimalForm from "@/components/mypage/shelter/Animal-manage/AnimalForm";

// 보호동물 수정페이지
export default function Page() {
    return (
        <div>
            <Typography variant="title">보호동물 수정</Typography>
            {/* 애니멀폼 가져오기 */}
            {/* <AnimalForm mode="edit" animal={animal} />           */}
        </div>
    );
}