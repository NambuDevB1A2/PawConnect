'use client';

import { InputHTMLAttributes, useContext } from "react";
import styles from "@/styles/common/Radio.module.css";
import Typography from "@/components/common/Typography";
import { RadioGroupContext } from "@/components/common/RadioGroup";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode;
    text?: string;
    value: string;
}

export default function Radio({
    children,
    text,
    value,
    className = "",
    disabled,
    onChange,
    ...props
}: RadioProps) {
    const group = useContext(RadioGroupContext);

    const checked = group ? group.value === value : props.checked;
    const isDisabled = group ? group.disabled || disabled: disabled;

    return (
        <div className={styles.wrapper_radio}>
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
        </div>
    );
}