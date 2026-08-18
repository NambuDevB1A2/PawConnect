'use client';

import AppImage from "@/components/common/AppImage";
import Typography from "@/components/common/Typography";
import MyPawLogOptions from "@/components/pawlog/MyPawLogOptions";
import styles from "@/styles/pawlog/PawLogCard.module.css"
import { PawLog } from "@/types/pawlog/pawlog.type";
import { formatDate } from "@/utils/format.util";
import { useRouter } from "next/navigation";

interface PawLogCardProps {
    pawLog: PawLog;
}

export default function PawLogCard({ pawLog }: PawLogCardProps) {
    const router = useRouter();
    const imgSrc = pawLog.images?.length > 0 ? pawLog.images?.[0].img : undefined;

    const handleClick = () => {
        router.push(`/pawlog/${pawLog.id}`);
    };


    return (
        <div className={styles.wrapper_pawlog_card} onClick={handleClick}>
            <AppImage className={styles.img_pawlog} src={imgSrc}/>

            <div className={styles.box_pawlog}>
                <div className={styles.box_author}>
                    <AppImage className={styles.img_author_profile} src={pawLog.author.imgProfile} width={100} height={100} />
                    <Typography>{pawLog.author.nickname}</Typography>
                    <Typography className={styles.typo_at} variant="caption">{formatDate(pawLog.updatedAt)}</Typography>

                    <MyPawLogOptions pawLog={pawLog}/>
                </div>

                <div className={styles.box_info}>
                    <Typography variant="subtitle">{pawLog.title}</Typography>
                    <Typography className={styles.typo_content}>{pawLog.content}</Typography>
                </div>
            </div>
        </div>
    );
}