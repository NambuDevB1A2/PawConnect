'use client';

import RegisterShelterForm from "@/components/auth/RegisterShelterForm";
import RegisterUserForm from "@/components/auth/RegisterUserForm";
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import Typography from "@/components/common/Typography";
import styles from "@/styles/auth/register.module.css"
import { Enums } from "@/types/enum";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterRole() {
    const [role, setRole] = useState<Enums.Role | undefined>(undefined);
    const router = useRouter();

    if (!role) {
        return (
            <div className={styles.wrapper_roles}>
                <Typography>회원의 유형을 선택해주세요</Typography>
                <div className={styles.box_roles}>
                    <Button
                        className={styles.btn_user} variant="outline"
                        onClick={() => setRole(Enums.Role.USER)}>
                        <Icon name={`accessibility_new`} color="primary" size="hero"/>
                        <Typography variant="subtitle">일반 사용자<br/>(개인회원)</Typography>
                    </Button>
                    <Button
                        className={styles.btn_shelter} variant="outline"
                        onClick={() => setRole(Enums.Role.SHELTER)}>
                        <Icon name={`account_balance`} color="primary" size="hero"/>
                        <Typography variant="subtitle">보호소 관리자<br/>(기업회원)</Typography>
                    </Button>
                </div>
            </div>
        );
    }
    
    switch (role) {
        case Enums.Role.USER: 
            return <RegisterUserForm/>;
        case Enums.Role.SHELTER: 
            return <RegisterShelterForm/>;
        default: 
            router.push('/');
            break;
    }
}