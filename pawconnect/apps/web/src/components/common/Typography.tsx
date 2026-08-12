import styles from "@/styles/common/Typography.module.css"
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

type TypographyWeight =
    "thin" |
    "extralight" |
    "light" |
    "regular" |
    "medium" |
    "semibold" |
    "bold" |
    "extrabold" |
    "black";


interface TypographyProps extends HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
    variant?: TypographyVariant;
    weight?: TypographyWeight;
}

export default function Typography({ 
    children,
    variant = "body1", 
    weight,
    className = "", 
    ...props 
}: TypographyProps) {
    return (
        <p className={`${styles[variant]} ${weight ? styles[weight] : ""} ${className}`}
            {...props} >
            {children}
        </p>
    );
}