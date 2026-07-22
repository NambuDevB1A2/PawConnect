'use client';

import IconButton from "@/components/common/IconButton";
import Typography from "@/components/common/Typography";
import { User } from "@/types/auth/user.type";
import styles from "@/styles/layout/Header.module.css"
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { Logout } from "@/services/auth/logout.server";
import { useEffect, useRef, useState } from "react";
import { Enums } from "@/types/enum";
import AppImage from "@/components/common/AppImage";

interface HeaderUserProps {
    user: User | undefined;
}

interface MenuItem {
    label: string;
    onClick?: () => void;
}

export default function HeaderUser({ user }: HeaderUserProps) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const boxRef = useRef<HTMLDivElement>(null);

    // 드롭다운 바깥 클릭시 닫기 (Select와 동일한 구조)
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const handleRouterPush = (page: string) => {
        setIsOpen(false);
        router.push(page);
    };

    const handleLogout = async () => {
        await Logout();
        setIsOpen(false);
        router.push('/');
    };

    const menuItemByRole: Partial<Record<Enums.Role, MenuItem[]>> = {
        [Enums.Role.USER]: [
            { label: "내 정보", onClick: () => handleRouterPush('/mypage/info') },
            { label: "내 입양 신청", onClick: () => handleRouterPush('/mypage/adopt') },
            { label: "내 PawLog", onClick: () => handleRouterPush('/mypage/petlog') },
            { label: "로그아웃", onClick: handleLogout },
        ],
        [Enums.Role.SHELTER]: [
            { label: "내 정보", onClick: () => handleRouterPush('/mypage/info') },
            { label: "내 PawLog", onClick: () => handleRouterPush('/mypage/petlog') },
            { label: "보호소 관리", onClick: () => handleRouterPush('/mypage/shelter') },
            { label: "보호동물 관리", onClick: () => handleRouterPush('/mypage/shelter/animal') },
            { label: "입양 신청 관리", onClick: () => handleRouterPush('/mypage/shelter/adopt') },
            { label: "로그아웃", onClick: handleLogout },
        ],
        [Enums.Role.ADMIN]: [
            { label: "로그아웃", onClick: handleLogout },
        ],
    };
    
    const menuItems = user?.role ? menuItemByRole[user.role] : undefined;

    return (
        <div className={styles.box_mypage} ref={boxRef}>
        {user ?
            <div className={styles.box_user}>
                <AppImage className={styles.img_profile} src={user?.imgProfile}/>
                <Typography className={styles.nickname} weight="semibold">{user?.nickname}</Typography>
                <IconButton 
                    className={`${styles.btn_menu} ${isOpen ? styles.icon_chevron_open : styles.icon_chevron}`} 
                    name="arrow_drop_down" 
                    onClick={() => setIsOpen((prev) => !prev)}/>
            </div> :
            <Button onClick={() => router.push(`/login`)}>로그인</Button> }
            
        <div className={`${styles.box_dropdown} ${isOpen && menuItems ? styles.box_dropdown_open : ""}`}>
            {menuItems?.map((item) => 
                <Button key={item.label} variant="ghostBlack" size="small" onClick={item.onClick}>
                    {item.label}
                </Button> 
            )}
        </div>

        </div>
    );
}