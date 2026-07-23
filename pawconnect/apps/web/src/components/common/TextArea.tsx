'use client';

import Typography from "@/components/common/Typography";
import { TextareaHTMLAttributes, useState } from "react";
import styles from "@/styles/common/TextArea.module.css"

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    labelText?: string;
    helperText?: string;
    defaultValue?: string;
    maxLength?: number;
    disabledCount: boolean;
    wrapperClassname?: string;
}

export default function TextArea({
    labelText,
    helperText,
    defaultValue,
    maxLength,
    disabledCount = false,
    wrapperClassname = "",
    className = "",
    ...props
}: TextAreaProps) {
    const [count, setCount] = useState(0);

    if (!maxLength) maxLength = defaultValue?.length;

    return (
        <span className={`${styles.wrapper_input} ${wrapperClassname}`}>
            <Typography className={`${styles.label_text}`}>{labelText}</Typography>
            <div className={styles.box_textarea}>
                <textarea
                    className={`${styles.textarea} ${className}`}
                    placeholder={helperText}
                    defaultValue={defaultValue}
                    maxLength={maxLength}
                    onChange={(e) => setCount(e.target.value.length)}
                    {...props}/>
                {!disabledCount && <Typography className={styles.count_text} variant="caption">{`${count}/${maxLength}`}</Typography>}
            </div>
        </span>
    );
}