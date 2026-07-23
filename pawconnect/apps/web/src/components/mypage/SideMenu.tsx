'use client';

import { AuthContext } from "@/providers/AuthProvider";
import { Enums } from "@/types/enum";
import { useContext } from "react";
import styles from "@/styles/mypage/SideMenu.module.css"
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Logout } from "@/services/auth/logout.server";
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";

interface MenuItem {
    label: string;
    activePath?: string;
    path: string;
    icon?: string;
    children?: MenuItem[];
}

const SIDE_MENU_CONFIG: Record<Enums.Role, MenuItem[]> = {
    [Enums.Role.USER]: [
        { label: "마이페이지", activePath:"/mypage", path: "/mypage/info" },
        { label: "내 정보", path: "/mypage/info" },
        { label: "내 입양 신청", path: "/mypage/adopt" },
        { label: "내 PawLog", path: "/mypage/pawlog" },
    ],
    [Enums.Role.SHELTER]: [
        { label: "마이페이지", path: "/mypage/info", icon: "arrow_left_alt" },
        { label: "내 정보", path: "/mypage/info", icon: "person" },
        { label: "내 PawLog", path: "/mypage/pawlog", icon: "pets" },
        {
            label: "보호소 관리",
            activePath: "/mypage/shelter",
            path: "/mypage/shelter/info",
            icon: "account_balance",
            children: [
                { label: "보호소 정보", path: "/mypage/shelter/info" },
                { label: "보호동물 관리", path: "/mypage/shelter/animal" },
                { label: "입양 신청 관리", path: "/mypage/shelter/adopt" },
                { label: "통계 관리", path: "/mypage/shelter/stats" },
            ],
        },
    ],
    [Enums.Role.GUEST] : [],
    [Enums.Role.ADMIN] : [],
};

function isActive(itemPath: string, pathname: string, activePath?: string) {
    if (activePath) {
        return activePath === itemPath || activePath.startsWith(`${itemPath}/`);
    }
    
    return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
}

function MenuLink({ item, pathname, activePath }: { item: MenuItem; pathname: string; activePath?: string; }) {
    const active = isActive(item.path, pathname, activePath);

    return (
        <Link
            href={item.path}
            className={`${styles.btn_side} ${active ? styles.btn_side_active : ""}`}
            >
            {item.icon && <Icon name={item?.icon}/>}
            {item.label}
        </Link>
    );
}

export default function SideMenu() {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const pathname = usePathname();

    if (!user?.role) return null;

    const menuItems = SIDE_MENU_CONFIG[user.role];

    const handleLogout = async () => {
        await Logout();
        router.push("/");
    };

    return (
        <nav className={styles.wrapper_side_menu}>
            {menuItems.map((item) => (
                <div key={`${item.path}${item?.activePath}`} className={styles.box_menu_group}>
                    <MenuLink item={item} pathname={pathname} />

                    {item.children && (
                        <div className={styles.box_submenu}>
                            {item.children.map((child) => (
                                <MenuLink key={`${child.path}${child?.activePath}`} item={child} pathname={pathname} />
                            ))}
                        </div>
                    )}
                </div>
            ))}

            <Button
                variant="ghostBlack"
                className={styles.btn_side}
                onClick={handleLogout}
            >
                <Icon name="exit_to_app"/>
                로그아웃
            </Button>
        </nav>
    );
}