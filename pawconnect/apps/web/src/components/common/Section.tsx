import Typography from "@/components/common/Typography";
import { HTMLAttributes } from "react";
import styles from "@/styles/common/Section.module.css"

type SectionSize = "small" | "medium" | "large" | "xlarge";
type SectionAlign = "left" | "center" | "right";

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    size?: SectionSize;
    fullWidth?: boolean
    titleText?: string;
    align?: SectionAlign;
    wrapperClassName?: string;
    
}

export default function Section({
    children,
    size,
    titleText,
    fullWidth = true,
    wrapperClassName = "",
    className = "",
    align = "center",
}: SectionProps) {
    return (
        <div className={`${styles.wrapper_section} ${wrapperClassName}`}>
            {titleText && <Typography variant="title">{titleText}</Typography>}
            <div className={`${styles.box_section} ${styles[align]} ${size ? styles[size] : ""} ${className}`}
                style={{ width: !size && fullWidth ? "100%" : undefined }}>
                {children}
            </div>
        </div>
    );
}