import Icon from "@/components/common/Icon";
import Typography from "@/components/common/Typography";
import styles from "@/styles/common/CheckBox.module.css"
import { InputHTMLAttributes } from "react";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode;
    name?: string;
    text?: string;
    errorText?: string;
}

export default function CheckBox({ children, name, text, errorText, className = "", ...props }: CheckBoxProps) {
    return (
        <div className={styles.wrapper_checkbox}>
            <div className={styles.box_checkbox}>
                <span className={styles.box_input}>
                    <input 
                    className={`${styles.input} ${className}`} 
                    type="checkbox" 
                    name={name}
                    {...props}
                    />
                    <Icon name="check"
                    size="badge"
                    wrapperClassName={styles.wrapper_check_icon}
                    color="white"
                    />
                </span>
                <div className={styles.box_label}>
                    {text && <Typography>{text}</Typography>}
                    {children}
                </div>

            </div>
            {errorText && <Typography className={`${styles.error_text}`}>{errorText}</Typography>}
        </div>
    );
}