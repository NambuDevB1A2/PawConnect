import Button from "@/components/common/Button";
import Typography from "../common/Typography";

interface PawtiIntroProps {
    onStart: () => void;
}

// 인트로
export default function PawtiIntro({onStart}: PawtiIntroProps) {
    return (
        <div>
            <Typography variant="heading">
                PawTI
            </Typography>

            <Typography variant="caption">
                예상 소요시간 3분
            </Typography>

            <Typography variant="body1">
                나와 잘 맞는 반려동물을 찾아보세요.
            </Typography>

            <Button variant="primary" onClick={onStart}>시작하기</Button>
        </div>
    );
}