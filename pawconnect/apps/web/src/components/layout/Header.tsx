import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import Typography from "@/components/common/Typography";
import HeaderUser from "@/components/layout/HeaderUser";
import { Me } from "@/services/auth/me.server";
import styles from "@/styles/layout/Header.module.css"
import Link from "next/link";

export default async function Header() {
    const auth = await Me();

    return (
        <div className={styles.wrapper_header}>

            <Link className={styles.box_logo} href={`/`}>
                <Icon name="pets" color="primary"/>
                <Typography variant="subtitle" weight="extrabold">PawConnect</Typography>
            </Link>
                
            <div className={styles.box_link}>
                <Link href={`/paw`}><Button variant="ghost">보호동물</Button></Link>
                <Link href={`/shelter`}><Button variant="ghost">보호소</Button></Link>
                <Link href={`/mypet`}><Button variant="ghost">반려동물 자랑</Button></Link>
                <Link href={`/test/mbti`}><Button variant="ghost" >성향테스트</Button></Link>
            </div>

            <HeaderUser user={auth}/>

        </div>
    );
}