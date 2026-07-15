import Icon, { IconGrade, IconSize, IconVariant, IconWeight, IconColor } from "@/components/common/Icon";
import { ButtonHTMLAttributes } from "react";
import styles from "@/styles/common/iconButton.module.css"

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    name: string; // material sumbols 아이콘 이름
    size?: IconSize;
    weight?: IconWeight;
    grade?: IconGrade;
    color?: IconColor;
    wrapperBorder?: boolean;
    wrapperClassName?: string;
    buttonClassName?: string;
}

export default function IconButton({
    name,
    size = "default",
    weight = 400,
    grade = 0,
    color = "trueColor",
    wrapperBorder = false,
    wrapperClassName = "",
    buttonClassName = "",
    className = "",
    disabled,
    ...props
 }: IconButtonProps) {
    return (
        <button className={`${styles.button} ${buttonClassName}`} {...props}>
            <Icon
                name={name} variant="outlined" size={size} 
                fill={disabled ? false : true} weight={weight} grade={grade} color={disabled ? "falseColor" : color}
                wrapperBorder={wrapperBorder} wrapperClassName={wrapperClassName}
                className={className}/>
        </button>
    );
}