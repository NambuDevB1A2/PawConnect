'use client';

import IconButton from "@/components/common/IconButton";
import { AuthContext } from "@/providers/AuthProvider";
import { ModalContext } from "@/providers/ModalProvider";
import { DeletePawLog } from "@/services/pawlog/delete-pawlog.client";
import { PawLog } from "@/types/pawlog/pawlog.type";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import styles from "@/styles/pawlog/PawLogCard.module.css"

interface MyPawLogOptionsProps {
    pawLog?: PawLog;
}

export default function MyPawLogOptions({
    pawLog,
}: MyPawLogOptionsProps) {
    const { user } = useContext(AuthContext);
    const { openModal } = useContext(ModalContext);
    const router = useRouter();
    const pathname = usePathname();

    if (!pawLog) {
        return null;
    }
    
    const isMyPawLog = user?.id === pawLog.author.id;

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
            alert('게시글을 성공적으로 삭제했습니다');

            if (pathname.startsWith('/mypage'))
                router.refresh();
            else 
                router.push('/pawlog');
        }
        else {
            alert('삭제 도중 오류가 발생했습니다');
        }
    };

    return (
        <div className={styles.box_icons}>
            {isMyPawLog &&
                <div>
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
    );
}