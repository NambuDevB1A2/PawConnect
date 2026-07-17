'use client';

import { useState } from "react";

export function useSlider(
    maxIndex: number,
) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const isPrevActive = currentIndex > 0;
    const isNextActive = currentIndex < maxIndex;

    const handlePrev = () => {
        setCurrentIndex((prev) => {
            if (currentIndex <= 0) return 0;
            return prev - 1;
        });
    };

    const handleNext = () => {
        setCurrentIndex((prev) => {
            if (currentIndex >= maxIndex) return maxIndex;
            return prev + 1;
        });
    }

    return {
        currentIndex,
        isPrevActive,
        isNextActive,
        handlePrev,
        handleNext,
    }
}