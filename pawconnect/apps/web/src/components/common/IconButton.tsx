import Icon, { IconGrade, IconSize, IconWeight, IconColor } from "@/components/common/Icon";
import { ButtonHTMLAttributes } from "react";
import styles from "@/styles/common/IconButton.module.css"

type IconButtonType = "box" | "icon";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    name: string; // material sumbols 아이콘 이름
    size?: IconSize;
    weight?: IconWeight;
    grade?: IconGrade;
    color?: IconColor;
    buttonType?: IconButtonType;
    wrapperBorder?: boolean;
    wrapperClassName?: string;
    buttonClassName?: string;
}

export default function IconButton({
    name,
    size = "default",
    weight = 400,
    grade = 0,
    color = "color_true",
    buttonType = "box",
    wrapperBorder = false,
    wrapperClassName = "",
    buttonClassName = "",
    className = "",
    disabled,
    ...props
 }: IconButtonProps) {
    return (
        <button className={`${styles.button} ${buttonClassName} ${styles[buttonType]}`} {...props}>
            <Icon
                name={name} variant="outlined" size={size} 
                fill={!disabled} weight={weight} grade={grade} color={disabled ? "color_false" : color}
                wrapperBorder={wrapperBorder} wrapperClassName={wrapperClassName}
                className={className}/>
        </button>
    );
}