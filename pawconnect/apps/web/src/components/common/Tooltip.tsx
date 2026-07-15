import Icon from "@/components/common/Icon";
import Typography from "@/components/common/Typography";
import styles from "@/styles/common/Tooltip.module.css";

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface TooltipProps {
    children?: React.ReactNode;
    text?: string;
    position?: TooltipPosition;
    iconName?: string;
    buttonClassName?: string;
    className?: string;
}

export default function Tooltip({
    children,
    text,
    position = "bottom",
    iconName = "question_mark",
    buttonClassName = "",
    className = "",
}: TooltipProps) {
    return (
        <div className={styles.wrapper_tooltip}>
            <button className={`${styles.btn_tooltip} ${buttonClassName}`}>
                <Icon name={iconName} size="badge" color="white"/>
            </button>
            <span className={`${styles.tooltip} ${styles[position]} ${className}`}>
                {text && <Typography variant="caption" color="disabled">{text}</Typography>}
                {children}
            </span>
        </div>
    );
}