'use client';

import { AuthContext } from "@/providers/AuthProvider";
import { Enums } from "@/types/enum";
import { useContext } from "react";
import styles from "@/styles/mypage/SideMenu.module.css"
import { usePathname } from "next/navigation";
import Link from "next/link";
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import { ModalContext } from "@/providers/ModalProvider";

interface MenuItem {
    label: string;
    activePath?: string;
    path: string;
    icon?: string;
    children?: MenuItem[];
}

const SIDE_MENU_CONFIG: Record<Enums.Role, MenuItem[]> = {
    [Enums.Role.USER]: [
        { label: "마이페이지", activePath:"/mypage", path: "/", icon: "arrow_left_alt"  },
        { label: "내 정보", path: "/mypage/info", icon: "person" },
        { label: "내 입양 신청", path: "/mypage/adopt", icon: "post" },
        { label: "내 PawLog", path: "/mypage/pawlog", icon: "pets" },
    ],
    [Enums.Role.SHELTER]: [
        { label: "마이페이지", activePath:"/mypage", path: "/", icon: "arrow_left_alt"  },
        { label: "내 정보", path: "/mypage/info", icon: "person" },
        { label: "내 PawLog", path: "/mypage/pawlog", icon: "pets" },
        {
            label: "보호소 관리",
            activePath: "/mypage/shelter",
            path: "/mypage/shelter/info",
            icon: "account_balance",
            children: [
                { label: "보호소 정보", path: "/mypage/shelter/info" },
                { label: "보호동물 관리", path: "/mypage/shelter/paw" },
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
        return pathname === activePath || pathname.startsWith(`${activePath}`);
    }
    
    return pathname === itemPath || pathname.startsWith(`${itemPath}`);
}

function MenuLink({
    item,
    pathname,
    activePath,
    className = "",
}: {
    item: MenuItem;
    pathname: string;
    activePath?: string;
    className?: string;
}) {
  const active = isActive(item.path, pathname, activePath);

  return (
    <Link
      href={item.path}
      className={`${styles.btn_side} ${active ? styles.btn_side_active : ""} ${className}`}
    >
      {item.icon && (
        <Icon className={`${styles.icon_side} ${active ? styles.icon_side_active : ""}`} name={item?.icon}
        />
      )}
      {item.label}
    </Link>
  );
}

export default function SideMenu() {
    const { user } = useContext(AuthContext);
    const { openModal } = useContext(ModalContext);

    const pathname = usePathname();

    if (!user?.role) return null;

    const menuItems = SIDE_MENU_CONFIG[user.role];

    const handleLogout = () => {
        openModal("confirmLogout", undefined);
    };

    return (
        <nav className={styles.wrapper_side_menu}>
            {menuItems.map((item) => (
                <div key={`${item.path}${item?.activePath}`} className={styles.box_menu_group}>
                    <MenuLink item={item} pathname={pathname} activePath={item.activePath} />

                    {item.children && (
                        <div className={styles.box_submenu}>
                            {item.children.map((child) => (
                                <MenuLink 
                                    key={`${child.path}${child?.activePath}`}
                                    className={styles.btn_child}
                                    item={child} 
                                    pathname={pathname} 
                                    activePath={child.activePath} />
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
                <Icon className={styles.icon_side} name="exit_to_app"/>
                로그아웃
            </Button>
        </nav>
    );
}