import Icon from "@/components/common/Icon";
import { ButtonHTMLAttributes } from "react";
import styles from "@/styles/common/iconButton.module.css"

type IconVariant = "outlined" | "rounded" | "sharp";
type IconSize = "badge" | "input" | "default" | "status" | "hero";
type IconWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700;
type IconGrade = -25 | 0 | 200;
type IconColor = "defaultColor" | "primary" | "secondary" | "disabled" | "success" | "warning" | "error";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    name: string; // material sumbols 아이콘 이름
    variant?: IconVariant;
    size?: IconSize;
    fill?: boolean;
    weight?: IconWeight;
    grade?: IconGrade;
    color?: IconColor;
    wrapperBorder?: boolean;
    wrapperClassName?: string;
    buttonClassName?: string;
}

export default function IconButton({
    name,
    variant = "outlined",
    size = "default",
    fill = false,
    weight = 400,
    grade = 0,
    color = "defaultColor",
    wrapperBorder = false,
    wrapperClassName = "",
    buttonClassName = "",
    className = "",
    ...props
 }: IconButtonProps) {
    return (
        <button className={`${styles.button} ${buttonClassName}`} {...props}>
            <Icon
                name={name} variant={variant} size={size} 
                fill={fill} weight={weight} grade={grade} color={color}
                wrapperBorder={wrapperBorder} wrapperClassName={wrapperClassName}
                className={className}/>
        </button>
    );
}