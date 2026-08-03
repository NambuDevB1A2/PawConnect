import Button from "@/components/common/Button";
import Typography from "@/components/common/Typography";

export default function Page() {
    return (
        <div>
            <Typography variant="heading">📝PaWTI</Typography>

            <Typography variant="caption">⏱ 예상 소요시간 3분</Typography>

            <Typography variant="body1">나와 맞는 반려동물 성향을 찾아보세요</Typography>


            <Button variant="outline">[ 시작하기 ]</Button>
            <Typography variant="caption">Num 만명이 선택한 PawTI</Typography>

        </div>
    );
}