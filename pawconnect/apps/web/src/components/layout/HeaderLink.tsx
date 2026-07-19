'use client';

import Button from "@/components/common/Button";
import styles from "@/styles/layout/Header.module.css"
import { useRouter } from "next/navigation";

export default function HeaderLink() {
    const router = useRouter();
    
    return (
        <div className={styles.box_link}>
            <Button variant="ghost" onClick={() => router.push(`/paw`)}>보호동물</Button>
            <Button variant="ghost" onClick={() => router.push(`/shelter`)}>보호소</Button>
            <Button variant="ghost" onClick={() => router.push(`/mypet`)}>반려동물 자랑</Button>
            <Button variant="ghost" onClick={() => router.push(`/test/mbti`)}>성향테스트</Button>
        </div>
    );
}