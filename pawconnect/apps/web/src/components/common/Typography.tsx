import styles from "@/styles/common/typography.module.css"

type TypographyVariant =
    "display" |
    "heading" |
    "title" |
    "modaltitle" |
    "subtitle" |
    "menutitle" |
    "body1" |
    "body2" |
    "body3";

interface TypographyProps {
    children: React.ReactNode;
    variant?: TypographyVariant;
    className?: string;
}

export default function Typography({ children, variant = "body1", className = "" }: TypographyProps) {
    return (
        <p className={`${styles[variant]} ${className}`} >
            {children}
        </p>
    );
}