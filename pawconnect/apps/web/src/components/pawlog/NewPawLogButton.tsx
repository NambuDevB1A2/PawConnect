'use client';

import Button from "@/components/common/Button";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function NewPawLogButton() {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const handleClick = () => {
        router.push(`/mypage/pawlog/new`);
    };

    if (!user) {
        return null;
    }

    return (
        <Button variant="secondary" fullWidth onClick={handleClick}>
            새로운 PawLog 게시하기
        </Button>
    );
}