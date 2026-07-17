'use client';

import IconButton from "@/components/common/IconButton";
import { useContext, useState } from "react";
import styles from "@/styles/common/ImageSlider.module.css"
import { ModalContext } from "@/providers/ModalProvider";

type ImageSliderSize = "small" | "medium" | "large" | "xlarge";

interface ImageSliderProps {
    images: string[];
    size?: ImageSliderSize;
    wrapperClassName?: string;
    className?: string;
}

export default function ImageSlider({
    images,
    size = "medium",
    wrapperClassName = "",
    className = "",
}: ImageSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const { openModal } = useContext(ModalContext);

    const isPrevActive = currentIndex > 0;
    const isNextActive = currentIndex < images.length - 1;

    const handlePrev = () => {
        setCurrentIndex((prev) => {
            if (currentIndex <= 0) return 0;
            return prev - 1;
        });
    };

    const handleNext = () => {
        setCurrentIndex((prev) => {
            if (currentIndex >= images.length - 1) return images.length - 1;
            return prev + 1;
        });
    }

    const handleClick = () => {
        openModal("imageViewer", {
            images: images,
            currentIndex: currentIndex,
        });
    };

    if (images.length === 0) return null;

    return (
        <div className={`${styles.wrapper_slider} ${wrapperClassName}`}>
            <IconButton 
                className={styles.btn_prev} 
                name="keyboard_arrow_left" 
                size="hero"
                onClick={handlePrev}
                disabled={!isPrevActive}
                />

            <div className={`${styles.wrapper_images} ${styles[size]} ${className}`}>
                <div className={styles.track}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        
                    {images.map((src, index) =>
                        <div className={styles.slide} key={src}>
                            <img src={src} className={styles.img_slide} onClick={handleClick}/>
                        </div>
                    )}

                </div>
            </div>

            <IconButton 
                className={styles.btn_next} 
                name="keyboard_arrow_right" 
                size="hero"
                onClick={handleNext}
                disabled={!isNextActive}
                />
        </div>
    );
}