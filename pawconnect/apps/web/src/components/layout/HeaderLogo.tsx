'use client';

import Icon from "@/components/common/Icon";
import Typography from "@/components/common/Typography";
import styles from "@/styles/layout/Header.module.css"
import { useRouter } from "next/navigation";

export default function HeaderLogo() {
    const router = useRouter();

    return (
        <div className={styles.box_logo} onClick={() => router.push(`/`)}>
            <Icon name="pets" color="primary"/>
            <Typography variant="subtitle" weight="extrabold">PawConnect</Typography>
        </div>
    );
}