import styles from "@/styles/common/typography.module.css"
import { HTMLAttributes } from "react";

type TypographyVariant =
    "display" |
    "heading" |
    "title" |
    "modaltitle" |
    "subtitle" |
    "menutitle" |
    "body1" |
    "body2" |
    "body3" |
    "caption";

interface TypographyProps extends HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
    variant?: TypographyVariant;
}

export default function Typography({ children, variant = "body1", className = "", ...props }: TypographyProps) {
    return (
        <p className={`${styles[variant]} ${className}`}
            {...props} >
            {children}
        </p>
    );
}