'use client';

import Button from "@/components/common/Button";
import Typography from "@/components/common/Typography";
import styles from "@/styles/shelter/shelterDetail.module.css"
import { useRouter } from "next/navigation";

interface ShelterAnimalTitleButtonProps {
    shelterName?: string;
}

export default function ShelterAnimalTitleButton({ shelterName }: ShelterAnimalTitleButtonProps) {
    const router = useRouter();
    const encodedSearch = encodeURIComponent(shelterName ?? "");
    
    return (
        <div className={styles.box_title}>
            <Typography variant="title">등록된 보호동물</Typography>
            <Button variant="text" onClick={() => router.push(`/paw?keyword=${encodedSearch}`)}>더보기</Button>
        </div>
    );
}