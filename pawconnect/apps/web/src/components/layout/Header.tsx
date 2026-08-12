import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import Typography from "@/components/common/Typography";
import HeaderUser from "@/components/layout/HeaderUser";
import styles from "@/styles/layout/Header.module.css"
import { User } from "@/types/auth/user.type";
import Link from "next/link";

interface HeaderProps {
    user: User | undefined;
}

export default async function Header({ user }: HeaderProps) {
    return (
        <header className={styles.wrapper_header}>

            <Link className={styles.box_logo} href={`/`}>
                <Icon name="pets" color="primary"/>
                <Typography variant="subtitle" weight="extrabold">PawConnect</Typography>
            </Link>

            <div className={styles.box_link}>
                <Link href={`/paw?reset=true`}><Button variant="ghostBlack">보호동물</Button></Link>
                <Link href={`/shelter`}><Button variant="ghostBlack">보호소</Button></Link>
                <Link href={`/pawlog`}><Button variant="ghostBlack">PawLog</Button></Link>
                <Link href={`/pawlab`}><Button variant="ghostBlack" >PawLab</Button></Link>
            </div>

            <HeaderUser user={user}/>

        </header>
    );
}