'use client';

import Typography from "@/components/common/Typography";
import { TextareaHTMLAttributes, useState } from "react";
import styles from "@/styles/common/TextArea.module.css"

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    labelText?: string;
    helperText?: string;
    maxLength: number;
    wrapperClassname?: string;
}

export default function TextArea({
    labelText,
    helperText,
    maxLength,
    wrapperClassname = "",
    className = "",
    ...props
}: TextAreaProps) {
    const [count, setCount] = useState(0);

    return (
        <span className={`${styles.wrapper_input} ${wrapperClassname}`}>
            <Typography className={`${styles.label_text}`}>{labelText}</Typography>
            <div className={styles.box_textarea}>
                <textarea
                    className={`${styles.textarea} ${className}`}
                    placeholder={helperText}
                    maxLength={maxLength}
                    onChange={(e) => setCount(e.target.value.length)}
                    {...props}/>
                <Typography className={styles.count_text} variant="caption">{`${count}/${maxLength}`}</Typography>
            </div>
        </span>
    );
}