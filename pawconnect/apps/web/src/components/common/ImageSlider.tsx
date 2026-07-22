'use client';

import IconButton from "@/components/common/IconButton";
import { useContext } from "react";
import styles from "@/styles/common/ImageSlider.module.css"
import { ModalContext } from "@/providers/ModalProvider";
import { useSlider } from "@/hooks/common/useSlider";
import AppImage from "@/components/common/AppImage";

type ImageSliderSize = "small" | "medium" | "large" | "xlarge";

interface ImageSliderProps {
    images: string[];
    size?: ImageSliderSize;
    disabledDomain?: boolean;
    wrapperClassName?: string;
    className?: string;
}

export default function ImageSlider({
    images,
    size = "medium",
    disabledDomain = false,
    wrapperClassName = "",
    className = "",
}: ImageSliderProps) {
    const {
        currentIndex,
        isPrevActive,
        isNextActive,
        handlePrev,
        handleNext, } = useSlider(images.length - 1);

    const { openModal } = useContext(ModalContext);

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
                        <div className={styles.slide} key={`${src}-${index}`}>
                            <AppImage src={src} className={styles.img_slide} onClick={handleClick} disabledDomain={disabledDomain}/>
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