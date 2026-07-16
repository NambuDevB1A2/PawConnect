import { InputHTMLAttributes } from "react";
import styles from "@/styles/common/Input.module.css"

export type InputErrorType = "correct" | "error";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    labelText?: string;
    errorText?: string;
    errorType?: InputErrorType;
    helperText?: string;
    wrapperClassname?: string;
}

export default function Input({
    labelText,
    errorText,
    errorType = "error",
    helperText,
    wrapperClassname = "",
    className = "",
    ...props
}: InputProps) {
    const error = errorText && errorType == "error";

    return (
        <span className={`${styles.wrapper_input} ${wrapperClassname}`}>
            <p className={`${styles.label_text}`}>{labelText}</p>
            <input
                className={`${styles.input} ${error ? styles.input_error : ""} ${className}`}
                placeholder={helperText}
                {...props}/>
            <p className={`${styles.error_text} ${styles[errorType]}`}>{errorText}</p>
        </span>
    );
}