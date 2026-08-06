'use client';

import Typography from "@/components/common/Typography";
import { TextareaHTMLAttributes, useState } from "react";
import styles from "@/styles/common/TextArea.module.css"

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    labelText?: string;
    helperText?: string;
    errorText?: string;
    defaultValue?: string;
    maxLength?: number;
    disabledCount?: boolean;
    wrapperClassname?: string;
}

export default function TextArea({
    labelText,
    helperText,
    errorText,
    defaultValue,
    value,
    maxLength,
    disabledCount = false,
    wrapperClassname = "",
    className = "",
    onChange,
    ...props
}: TextAreaProps) {
    const [count, setCount] = useState(
        (value as string)?.length ?? defaultValue?.length ?? 0
    );

    if (!maxLength) maxLength = defaultValue?.length ?? (value as string)?.length;

    // 컨트롤드(value)일 땐 value 길이를 그대로 쓰고, 아니면 내부 count state를 사용
    const displayCount = value !== undefined ? (value as string).length : count;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCount(e.target.value.length);
        onChange?.(e); // 부모가 넘긴 onChange도 반드시 같이 실행
    };

    return (
        <span className={`${styles.wrapper_input} ${wrapperClassname}`}>
            <Typography className={`${styles.label_text}`}>{labelText}</Typography>
            <div className={`${styles.box_textarea} ${errorText ? styles.box_textarea_error : ""}`}>
                <textarea
                    className={`${styles.textarea} ${className}`}
                    placeholder={helperText}
                    defaultValue={defaultValue}
                    value={value}
                    maxLength={maxLength}
                    onChange={handleChange}
                    {...props}/>
                {!disabledCount && <Typography className={styles.count_text} variant="caption">{`${displayCount}/${maxLength}`}</Typography>}
            </div>
            {errorText && <Typography className={`${styles.error_text}`}>{errorText}</Typography>}
        </span>
    );
}