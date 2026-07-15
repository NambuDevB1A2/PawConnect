import Typography from "@/components/common/Typography";
import { HTMLAttributes } from "react";
import styles from "@/styles/common/section.module.css"

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    titleText?: string;
}

export default function Section({
    children,
    titleText,
}: SectionProps) {
    return (
        <div className={styles.wrapper_section}>
            {titleText && <Typography variant="title">{titleText}</Typography>}
            <div className={styles.box_section}>
                {children}
            </div>
        </div>
    );
}