import Typography from "@/components/common/Typography";
import AnimalForm from "@/components/mypage/shelter/Animal-manage/AnimalForm";

// 보호동물 등록페이지
export default function Page() {
    return (
        <div>
            <Typography variant="heading">보호동물 등록</Typography>
            {/* 애니멀폼 가져오기 */}
            <AnimalForm mode="create" />
            
            {/* 등록요청 */}
          
        </div>
    );
}