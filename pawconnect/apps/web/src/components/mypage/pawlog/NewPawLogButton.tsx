'use client';

import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";

export default function NewPawLogButton() {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/mypage/pawlog/new`);
    };

    return (
        <Button variant="secondary" fullWidth onClick={handleClick}>
            새로운 PawLog 게시하기
        </Button>
    );
}