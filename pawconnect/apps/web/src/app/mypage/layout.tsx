import SideMenu from "@/components/mypage/SideMenu";
import styles from "@/styles/mypage/SideMenu.module.css"

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={styles.wrapper_layout}>
            <SideMenu/>
            {children}
        </div>
    );
}