'use client';

import AppImage from "@/components/common/AppImage";
import IconButton from "@/components/common/IconButton";
import Typography from "@/components/common/Typography";
import { AuthContext } from "@/providers/AuthProvider";
import { ModalContext } from "@/providers/ModalProvider";
import { DeletePawLog } from "@/services/pawlog/delete-pawlog.client";
import styles from "@/styles/card/PawLogCard.module.css"
import { PawLog } from "@/types/pawlog/pawlog.type";
import { formatDate } from "@/utils/format.util";
import { useRouter } from "next/navigation";
import { useContext } from "react";

interface PawLogCardProps {
    pawLog: PawLog;
}

export default function PawLogCard({ pawLog }: PawLogCardProps) {
    const { user } = useContext(AuthContext);
    const { openModal } = useContext(ModalContext);
    const router = useRouter();
    const isMyPawLog = user?.id === pawLog.author.id;
    const imgSrc = pawLog.images?.length > 0 ? pawLog.images?.[0].img : undefined;

    const handleClick = () => {
        router.push(`/pawlog/${pawLog.id}`);
    };

    const handleEdit = () => {
        router.push(`/mypage/pawlog/edit/${pawLog.id}`);
    };

    const handleDelete = () => {
        openModal("confirmDelete", {
            onConfirm: handleConfirmDelete,
        })
    };

    const handleConfirmDelete = async () => {
        const res = await DeletePawLog(pawLog.id);
        if (res.success) {
            router.refresh();
            alert('게시글을 성공적으로 삭제했습니다');
        }
    };

    return (
        <div className={styles.wrapper_pawlog_card} onClick={handleClick}>
            <AppImage className={styles.img_pawlog} src={imgSrc}/>

            <div className={styles.box_pawlog}>
                <div className={styles.box_author}>
                    <AppImage className={styles.img_author_profile} src={pawLog.author.imgProfile} />
                    <Typography>{pawLog.author.nickname}</Typography>
                    <Typography className={styles.typo_at} variant="caption">{formatDate(pawLog.updatedAt)}</Typography>

                    {isMyPawLog &&
                        <div className={styles.box_icons}>
                            <IconButton 
                                name="edit" 
                                color="color_default" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit();
                                }}
                            />
                            <IconButton 
                                name="delete" 
                                color="color_default" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete();
                                }}
                            />
                        </div>
                    }
                </div>

                <div className={styles.box_info}>
                    <Typography variant="subtitle">{pawLog.title}</Typography>
                    <Typography className={styles.typo_content}>{pawLog.content}</Typography>
                </div>
            </div>
        </div>
    );
}