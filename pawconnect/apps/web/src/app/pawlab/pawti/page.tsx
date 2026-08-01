'use client'
import Button from "@/components/common/Button";
import Typography from "@/components/common/Typography";
import PawtiIntro from "@/components/pawti/PawtiIntro";
import { useRouter } from "next/navigation";


// PawTI 소개/메인 페이지
export default function Page() {
    const router = useRouter();
    return (
        <div>
            {/* <PawtiIntro /> */}
            <Typography variant="heading">📝PaWTI</Typography>

            <Typography variant="caption">⏱ 예상 소요시간 3분</Typography>

            <Typography variant="body1">나와 맞는 반려동물 성향을 찾아보세요</Typography>


            <Button variant="outline" onClick={()=> router.push("/pawlab/pawti/test")}>
                START</Button>
            <Typography variant="caption">Num 만명이 선택한 PawTI</Typography>

        </div>
    );
}