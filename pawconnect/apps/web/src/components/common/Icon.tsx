import { HTMLAttributes } from "react";
import styles from "@/styles/common/icon.module.css"

type IconVariant = "outlined" | "rounded" | "sharp";
type IconSize = "badge" | "input" | "default" | "status" | "hero";
type IconWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700;
type IconGrade = -25 | 0 | 200;
type IconColor = "defaultColor" | "primary" | "secondary" | "disabled" | "success" | "warning" | "error";

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
    name: string; // material sumbols 아이콘 이름
    variant?: IconVariant;
    size?: IconSize;
    fill?: boolean;
    weight?: IconWeight;
    grade?: IconGrade;
    color?: IconColor;
    wrapperBorder?: boolean;
    wrapperClassName?: string;
}

export default function Icon({ 
    name,
    variant = "outlined",
    size = "default",
    fill = false,
    weight = 400,
    grade = 0,
    color = "defaultColor",
    wrapperBorder = false,
    wrapperClassName = "",
    className = "",
    style,
    ...props
 }: IconProps) {
    return (
        <span className={`
            ${styles.wrapper_icon} ${styles[size]} ${styles[color]} 
            ${wrapperBorder ? styles.bordered : ""} ${wrapperClassName}`}>
            <span
                className={`${styles.icon} ${styles[variant]} ${className}`}
                style={{
                    fontSize: size,
                    ["--icon-fill" as string]: fill ? 1 : 0,
                    ["--icon-wght" as string]: weight,
                    ["--icon-grad" as string]: grade,
                    ...style,
                }}
                aria-hidden="true"
                {...props}>
                    {name}
            </span>
        </span>
    );
}