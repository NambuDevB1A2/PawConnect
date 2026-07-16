'use client';

import IconButton from "@/components/common/IconButton";
import Input from "@/components/common/Input";
import styles from "@/styles/common/InputSearch.module.css"

interface InputSearchProps {
    helperText?: string;
    onClick?: () => void;
    wrapperClassname?: string;
    className?: string;
}

export default function InputSearch({
    helperText = "검색어를 입력해주세요",
    onClick,
    wrapperClassname = "",
    className = "",
}: InputSearchProps) {
    
    return (
        <div className={styles.wrapper_search}>
            <div className={styles.wrapper_input}>
                <Input
                    helperText={helperText}
                    wrapperClassname={wrapperClassname}
                    className={`${styles.input} ${className}`}
                    />
                <IconButton 
                    wrapperClassName={styles.icon_search} 
                    name="search" 
                    color="color_false"
                    size="default"
                    onClick={onClick}
                    />
            </div>
        </div>
    );
}