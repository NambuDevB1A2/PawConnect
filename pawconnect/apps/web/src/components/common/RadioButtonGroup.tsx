'use client';

import { createContext, isValidElement, ReactElement, useId, useState } from "react";
import styles from "@/styles/common/RadioButton.module.css"

interface RadioGroupContextType {
    name: string;
    value: string | undefined;
    onSelect: (value: string) => void;
    disabled: boolean;
}

export const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

type RadioGroupDirection = "row" | "column";

interface RadioGroupProps {
    children: React.ReactNode;
    name?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    direction?: RadioGroupDirection;
    className?: string;
}

export default function RadioButtonGroup({
    children,
    name,
    defaultValue,
    onChange,
    disabled = false,
    direction = "column",
    className = "",
}: RadioGroupProps) {
    const generatedId = useId();
    const groupName = name ?? generatedId;
    
    const [currentValue, setCurrentValue] = useState(defaultValue);

    const handleSelect = (nextValue: string) => {
        setCurrentValue(nextValue);
        onChange?.(nextValue);
    };
    
    return (
        <div className={`${styles.wrapper_radio_group} ${styles[direction]} ${className}`}>
            <RadioGroupContext.Provider value={{ name: groupName, value: currentValue, onSelect: handleSelect, disabled }}>
                {children}
            </RadioGroupContext.Provider>
        </div>);
}