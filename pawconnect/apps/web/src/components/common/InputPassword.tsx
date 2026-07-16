'use client';

import IconButton from "@/components/common/IconButton";
import Input, { InputProps } from "@/components/common/Input";
import { useCallback, useState } from "react";
import styles from "@/styles/common/InputPassword.module.css"

interface InputPasswordProps extends InputProps {
    
}

export default function InputPassword({
    labelText = "비밀번호",
    helperText = "비밀번호를 입력해주세요",
    wrapperClassname = "",
    className = "",
    ...props
}: InputPasswordProps) {
    const [visibility, setVisibility] = useState<"password" | "text">("password");

    const handleClick = useCallback(() => {
        if (visibility === "password")
            setVisibility("text");
        else if (visibility === "text")
            setVisibility("password");
    }, [visibility]);

    return (
        <div className={styles.wrapper_password}>
            <div className={styles.box_input}>
                <Input
                    labelText={labelText}
                    helperText={helperText}
                    wrapperClassname={wrapperClassname}
                    className={className}
                    type={visibility}
                    {...props}
                    >
                {visibility === "password" ?
                    <IconButton 
                        wrapperClassName={styles.icon_visibility_off} 
                        name="visibility_off" 
                        color="color_default"
                        size="input"
                        onClick={handleClick}
                        /> :
                    <IconButton 
                        wrapperClassName={styles.icon_visibility} 
                        name="visibility" 
                        color="color_default"
                        size="input"
                        onClick={handleClick}
                        />}
                </Input>
            </div>
        </div>
    );
}