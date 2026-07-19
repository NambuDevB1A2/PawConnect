'use client';

import IconButton from "@/components/common/IconButton";
import Typography from "@/components/common/Typography";
import { User } from "@/types/auth/user.type";
import styles from "@/styles/layout/Header.module.css"
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";

interface HeaderUserProps {
    user?: User;
}

export default function HeaderUser({
    user,
}: HeaderUserProps) {
    const router = useRouter();

    return (
        <div className={styles.box_mypage}>
        {user ?
            <div className={styles.box_user}>
                <img className={styles.img_profile} src={user.imgProfile}/>
                <Typography className={styles.nickname} weight="semibold">{user.nickname}</Typography>
                <IconButton className={styles.btn_menu} name="arrow_drop_down"/>
            </div> :
            <Button onClick={() => router.push(`/login`)}>로그인</Button> }
        </div>
    );
}