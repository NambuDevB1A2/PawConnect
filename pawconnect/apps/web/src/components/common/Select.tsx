'use client';

import { useEffect, useRef, useState } from "react";
import styles from "@/styles/common/Select.module.css"
import Typography from "@/components/common/Typography";
import Icon from "@/components/common/Icon";

export type SelectLabelPosition = "top" | "left";
export type SelectLabelSize = "small" | "medium" | "large" | "xlarge";

export interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}

interface SelectProps {
    options: SelectOption[],
    defaultValue?: string,
    onChange: (value: string) => void;
    labelText?: string;
    labelPosition?: SelectLabelPosition;
    labelSize?: SelectLabelSize;
    helperText?: string;
    disabled?: boolean;
    wrapperClassName?: string;
    className?: string;
}

export default function Select({
    options,
    defaultValue,
    onChange,
    labelText,
    labelPosition = "left",
    labelSize = "medium",
    helperText = "선택해주세요",
    disabled,
    wrapperClassName = "",
    className = "",
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentValue, setCurrentValue] = useState(defaultValue);

    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    // 드롭다운 바깥 클릭시 닫기
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const selectValue = (nextValue: string) => {
        setCurrentValue(nextValue);
        onChange?.(nextValue);
        setIsOpen(false);
    };

    const selectedOption = options.find((option) => option.value === currentValue);

    return (
        <div 
            className={`${styles.wrapper_select}  ${styles[labelPosition]} ${wrapperClassName}`}
            ref={containerRef}>
            <Typography className={`${styles.label_text} ${styles[labelSize]}`} weight="bold">{labelText}</Typography>
            <div className={styles.box_trigger}>
                <button
                    className={`${styles.trigger} ${className}`}
                    onClick={() => setIsOpen((prev) => !prev)}
                    disabled={disabled}>
                    <Typography
                        className={`${selectedOption ? styles.value_text : styles.helper_text}`}
                        >{selectedOption ? selectedOption.label : helperText}</Typography>
                    <Icon className={`${isOpen ? styles.icon_chevron_open : styles.icon_chevron}`} name="keyboard_arrow_down"/>
                </button>
                {isOpen && 
                    <ul ref={listRef} className={styles.box_options}>
                        {options.map((option) => 
                            <li
                                key={option.value}
                                className={`${styles.option} 
                                ${option.value === selectedOption?.value ? styles.option_selected : ""}
                                ${option.disabled ? styles.option_disabled : ""}
                                `}
                                aria-selected={option.value === currentValue}
                                onClick={() => !option.disabled && selectValue(option.value)}
                                >
                                    <Typography className={styles.option_text}>{option.label}</Typography>
                                </li>
                        )}
                    </ul>
                }
            </div>
        </div>
    );
}