import { useEffect, useRef } from "react";

export function useModalBehavior(
    isOpen: boolean,
    onClose: () => void
) {
    // 배경 스크롤 잠금
    useEffect(() => {
        if (!isOpen) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = originalOverflow };
    }, [isOpen]);

    // ESC 닫기
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
                return;
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);
}