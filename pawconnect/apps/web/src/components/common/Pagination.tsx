import Button from "@/components/common/Button";
import IconButton from "@/components/common/IconButton";
import styles from "@/styles/common/Pagination.module.css"

const PAGE_GROUP_SIZE = 5;

interface PaginationProps {
    page: number;
    maxPage: number;
    onPrev: () => void; // setPage((prev) => prev - 1)
    onPage: (page: number) => void;  // setPage(page)
    onNext: () => void; // setPage((prev) => prev + 1)
}

export default function Pagination({
    page,
    maxPage,
    onPrev,
    onPage,
    onNext,
}: PaginationProps) {
    const groupStart = Math.floor((page - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
    const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE - 1, maxPage);

    const pages = Array.from(
        { length: groupEnd - groupStart + 1 },
        (_, i) => groupStart + i
    );

    const isPrevActive = page > 1;
    const isNextActive = page < maxPage;

    return (
        <div className={styles.wrapper_pagination}>
            {isPrevActive && 
                <IconButton name="keyboard_arrow_left" buttonType="icon" onClick={onPrev}/>}
            <div className={styles.wrapper_pages}>
                {pages.map((p) =>
                    <Button 
                        key={p} 
                        variant="text"
                        className={`${styles.text_button} ${p === page ? styles.current_button : ""}`}
                        onClick={() => onPage(p)}
                    >{p}</Button>
                )}
            </div>
            {isNextActive && 
                <IconButton name="keyboard_arrow_right" buttonType="icon" onClick={onNext}/>}
        </div>
    );
}