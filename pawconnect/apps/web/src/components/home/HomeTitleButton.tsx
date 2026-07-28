'use client';

import Button from "@/components/common/Button";
import Typography from "@/components/common/Typography";
import styles from "@/styles/home/home.module.css"
import { useRouter } from "next/navigation";

interface HomeTitleButtonProps { 
    titleText: string;
    path: string;
}

export default function HomeTitleButton({ titleText, path }: HomeTitleButtonProps) {
    const router = useRouter();
    
    return (
        <div className={styles.box_title}>
            <Typography variant="title">{titleText}</Typography>
            <Button variant="text" onClick={() => router.push(path)}>더보기</Button>
        </div>
    );
}