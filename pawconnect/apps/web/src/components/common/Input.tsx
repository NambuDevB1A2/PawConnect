import { InputHTMLAttributes } from "react";
import styles from "@/styles/common/Input.module.css"
import Typography from "@/components/common/Typography";

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
            <Typography className={`${styles.label_text}`}>{labelText}</Typography>
            <input
                className={`${styles.input} ${error ? styles.input_error : ""} ${className}`}
                placeholder={helperText}
                {...props}/>
            <Typography className={`${styles.error_text} ${styles[errorType]}`}>{errorText}</Typography>
        </span>
    );
}