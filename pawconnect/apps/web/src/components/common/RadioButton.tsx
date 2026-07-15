'use client';

import { InputHTMLAttributes, useContext } from "react";
import styles from "@/styles/common/RadioButton.module.css";
import Typography from "@/components/common/Typography";
import { RadioGroupContext } from "@/components/common/RadioButtonGroup";

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode;
    text?: string;
    value: string;
}

export default function RadioButton({
    children,
    text,
    value,
    className = "",
    disabled,
    onChange,
    ...props
}: RadioButtonProps) {
    const group = useContext(RadioGroupContext);

    const checked = group ? group.value === value : props.checked;
    const isDisabled = group ? group.disabled || disabled: disabled;

    return (
        <label className={styles.wrapper_radio}>
        <span className={styles.box_input}>
            <input
                type="radio"
                className={`${styles.input} ${className}`}
                name={group?.name}
                value={value}
                checked={checked}
                disabled={isDisabled}
                onChange={(e) => { 
                    onChange?.(e);
                    group?.onSelect(value);
                }}
                {...props}/>
            <span className={styles.dot} />
        </span>
        <div className={styles.box_label}>
            {text && <Typography>{text}</Typography>}
            {children}
        </div>
        </label>
    );
}