import HeaderLink from "@/components/layout/HeaderLink";
import HeaderLogo from "@/components/layout/HeaderLogo";
import HeaderUser from "@/components/layout/HeaderUser";
import { Me } from "@/services/auth/me.server";
import styles from "@/styles/layout/Header.module.css"

export default async function Header() {
    const auth = await Me();

    return (
        <div className={styles.wrapper_header}>

            <HeaderLogo/>
            <HeaderLink/>
            <HeaderUser user={auth}/>

        </div>
    );
}