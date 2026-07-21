import styles from "@/styles/common/Button.module.css";
import { ButtonHTMLAttributes } from "react";

type ButtonSize = "large" | "medium" | "small";

type ButtonVariant =
    "primary" |
    "secondary" |
    "outline" |
    "modal" |
    "ghost" |
    "ghostBlack" |
    "success" |
    "danger" |
    "warning" |
    "text";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    size?: ButtonSize;
    variant?: ButtonVariant;
    fullWidth?: boolean;
}

export default function Button({
    children,
    size = "medium",
    variant = "primary",
    fullWidth = false,
    className = "",
    ...props
}: ButtonProps) {
    return (
        <button
            className={`${styles.button} ${variant !== "text" && styles[size]} ${styles[variant]} ${className}`}
            style={{ width: fullWidth ? "100%" : undefined }}
            {...props}
            >
            {children}
        </button>
    );
}