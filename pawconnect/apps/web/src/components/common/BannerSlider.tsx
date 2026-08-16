"use client";

import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import styles from "@/styles/common/BannerSlider.module.css";
import Typography from "@/components/common/Typography";
import Button, { ButtonVariant } from "@/components/common/Button";
import AppImage from "@/components/common/AppImage";
import { useRouter } from "next/navigation";
import { renderMultiline } from "@/utils/format-component.util";

export interface BannerSliderItemButton {
  id: string | number;
  variant?: ButtonVariant;
  label: string;
  path: string;
}

export interface BannerSliderItem {
  id: string | number;
  backgroundImage: string;
  title: string;
  description?: string;
  buttons?: BannerSliderItemButton[];
  children?: ReactNode;
}

interface BannerSliderProps {
  slides: BannerSliderItem[];
  intervalMs?: number;
  transitionMs?: number;
}

export default function BannerSlider({
  slides,
  intervalMs = 5000,
  transitionMs = 600,
}: BannerSliderProps) {
  const router = useRouter();

  const slideCount = slides.length;
  const isLoopable = slideCount > 1;

  // 무한 루프를 위해 앞뒤에 클론 슬라이드를 붙임: [last, ...slides, first]
  const extendedSlides = isLoopable
    ? [slides[slideCount - 1], ...slides, slides[0]]
    : slides;

  // 클론이 앞에 붙으므로 실제 첫 슬라이드는 index 1부터 시작
  const [currentIndex, setCurrentIndex] = useState(isLoopable ? 1 : 0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (isLoopable) {
      timerRef.current = setInterval(goToNext, intervalMs);
    }
  }, [goToNext, intervalMs, isLoopable]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        resetTimer();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [resetTimer]);

  // 클론 슬라이드에 도달했을 때 애니메이션 없이 실제 슬라이드 위치로 점프
  const handleTransitionEnd = () => {
    if (!isLoopable) return;

    if (currentIndex === extendedSlides.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(slideCount);
    }
  };

  const handleDotClick = (index: number) => {
    setIsTransitioning(true);
    setCurrentIndex(isLoopable ? index + 1 : index);
    resetTimer();
  };

  // 인디케이터(dot) 표시용 실제 슬라이드 인덱스 계산
  const realIndex = isLoopable
    ? (currentIndex - 1 + slideCount) % slideCount
    : currentIndex;

  if (slideCount === 0) return null;

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.track}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning
            ? `transform ${transitionMs}ms ease-in-out`
            : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedSlides.map((slide, idx) => (
          <div key={`${slide.id}-${idx}`} className={styles.slide}>
            <AppImage
              src={slide.backgroundImage}
              alt={slide.title}
              className={styles.slideImage}
              width={1900}
              height={800}
            />
            <div className={styles.overlay} />
            <div className={styles.content}>
              <Typography variant="heading">{renderMultiline(slide.title)}</Typography>
              {slide.description && <Typography>{renderMultiline(slide.description)}</Typography>}
              {slide.buttons && slide.buttons?.length > 0 &&
                <div className={styles.buttons}>
                  {slide.buttons?.map((btn) =>
                    <Button key={btn.id} variant={btn.variant} onClick={() => router.push(btn.path)}>
                      {btn.label}
                    </Button>
                  )}
                </div>
              }
              {slide.children}
            </div>
          </div>
        ))}
      </div>

      {isLoopable && (
        <div className={styles.dots}>
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`${idx + 1}번 슬라이드로 이동`}
              aria-current={idx === realIndex}
              className={`${styles.dot} ${
                idx === realIndex ? styles.dotActive : ""
              }`}
              onClick={() => handleDotClick(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
