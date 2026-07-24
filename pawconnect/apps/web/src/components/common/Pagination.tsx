'use client';

import Button from "@/components/common/Button";
import IconButton from "@/components/common/IconButton";
import styles from "@/styles/common/Pagination.module.css"
import { useRouter } from "next/navigation";

const PAGE_GROUP_SIZE = 5;

interface PaginationProps {
    page?: number;
    maxPage?: number;
    path: string;
}

export default function Pagination({
    page = 1,
    maxPage = 1,
    path,
}: PaginationProps) {
    const router = useRouter();

    const groupStart = Math.floor((page - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
    const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE - 1, maxPage);

    const pages = Array.from(
        { length: groupEnd - groupStart + 1 },
        (_, i) => groupStart + i
    );

    const isPrevActive = page > 1;
    const isNextActive = page < maxPage;

    const handlePage = (page: number) => {
        router.push(`${path}?page=${page}`);
    }

    const handlePrev = () => {
        if (page <= 0) return;
        handlePage(page - 1);
    }

    const handleNext = () => {
        if (page >= maxPage) return;
        handlePage(page + 1);
    }

    return (
        <div className={styles.wrapper_pagination}>
            <IconButton name="keyboard_arrow_left" buttonType="icon" onClick={handlePrev} disabled={!isPrevActive}/>

            <div className={styles.wrapper_pages}>
                {pages.map((p) =>
                    <Button 
                        key={p} 
                        variant="text"
                        className={`${styles.text_button} ${p === page ? styles.current_button : ""}`}
                        onClick={() => handlePage(p)}
                    >{p}</Button>
                )}
            </div>
            
            <IconButton name="keyboard_arrow_right" buttonType="icon" onClick={handleNext} disabled={!isNextActive}/>
        </div>
    );
}