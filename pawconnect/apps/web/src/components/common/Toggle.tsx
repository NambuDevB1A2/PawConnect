import { InputHTMLAttributes } from "react";
import styles from "@/styles/common/Toggle.module.css"
import Typography from "@/components/common/Typography";

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode;
    text?: string;
}

export default function Toggle({ children, text, className = "", ...props }: ToggleProps) {
    return (
        <div className={styles.wrapper_toggle}>
            <span className={styles.box_input}>
                <input className={`${styles.input} ${className}`} type="checkbox" {...props}/>
                <span className={styles.track}>
                    <span className={styles.thumb}/>
                </span>
            </span>
            <div className={styles.box_label}>
                {text && <Typography>{text}</Typography>}
                {children}
            </div>
        </div>
    );
}