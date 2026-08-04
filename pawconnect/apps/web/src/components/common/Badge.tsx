import { HTMLAttributes } from "react";
import styles from "@/styles/common/Badge.module.css"

export type BadgeVariant = "success" | "warning" | "completed" | "error" | "info" | "dog" | "cat";
type BadgeSize = "small" | "medium";

interface BadgeProps extends HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
}

export default function Badge({ children, variant = "info", size = "medium", className = "", ...props }: BadgeProps) {
    return (
        <p className={`${styles.badge} ${styles[variant]} ${styles[size]} ${className}`} 
            {...props}>
            {children}
        </p>
    );
}