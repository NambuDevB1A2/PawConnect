'use client';

import AppImage from "@/components/common/AppImage";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Typography from "@/components/common/Typography";
import { ADOPTION_STATUS_BADGE_STYLE, ADOPTION_STATUS_LABEL } from "@/constants/adopt/adopt-badge.constants";
import { MODAL_MESSAGES } from "@/constants/messages/Modal";
import { ANIMAL_STATUS_BADGE_STYLE, ANIMAL_STATUS_LABEL } from "@/constants/paw/animal-badge.constants";
import { ModalContext } from "@/providers/ModalProvider";
import { DeleteAdoption } from "@/services/adopt/delete-adoption.client";
import styles from "@/styles/adopt/AdoptCard.module.css"
import { Adoption } from "@/types/adopt/adoption.type";
import { formatDateTime } from "@/utils/format.util";
import { useRouter } from "next/navigation";
import { useContext } from "react";

interface AdoptionCardProps {
    adoption: Adoption;
}

export default function AdoptionCard({ adoption }: AdoptionCardProps) {
    const { openModal } = useContext(ModalContext);

    const router = useRouter();

    const handleDetail = () => {
        openModal("adoptionDetail", {
            adoptionId: adoption.id,
        });
    };

    const handleDelete = () => {
        openModal("confirmDelete", {
            onConfirm: handleConfirmDelete,

            header: MODAL_MESSAGES.confirmAdoptionDelete.header,
            body: MODAL_MESSAGES.confirmAdoptionDelete.body,
            confirm: MODAL_MESSAGES.confirmAdoptionDelete.confirm,
        });
    };

    const handleConfirmDelete = async () => {
        const res = await DeleteAdoption(adoption.id);

        if (res.success) {
            alert('성공적으로 신청을 취소했습니다');
            router.refresh();
        }
        else {
            alert('신청 취소 도중 오류가 발생했습니다');
        }
    };

    return (
        <div className={`${styles.wrapper_adoption_card} ${adoption.adoptionStatus === "CANCELED" ? styles.canceled : ""}`}>
            <div className={styles.wrapper_image}>
                <AppImage className={styles.img_animal} src={adoption.animal.imgThumbnail} />
                <Badge className={styles.badge_animal}
                    variant={ANIMAL_STATUS_BADGE_STYLE[adoption.animal.animalStatus]}>
                    {ANIMAL_STATUS_LABEL[adoption.animal.animalStatus]}
                </Badge>
            </div>

            <div className={styles.wrapper_info}>
                <div className={styles.box_info}>
                    <Typography className={styles.typo_detail}>[{adoption.animal.animalSpecies.name}] {adoption.animal.animalBreed.name}</Typography>
                    <Typography className={styles.typo_animal_name} variant="subtitle">{adoption.animal.name}</Typography>
                    <div className={styles.box_typo}>
                        <Typography className={styles.typo_detail_title}>신청일</Typography>
                        <Typography className={styles.typo_detail}>{formatDateTime(adoption.createdAt)}</Typography>
                    </div>

                    <div className={styles.box_typo}>
                        <Typography className={styles.typo_detail_title}>소속 보호소</Typography>
                        <Typography className={styles.typo_detail}>{adoption.animal.shelter.name}</Typography>
                    </div>

                    <div className={styles.box_badge}>
                        <Typography className={styles.typo_badge_title} weight="semibold">신청 상태</Typography>
                        <Badge variant={ADOPTION_STATUS_BADGE_STYLE[adoption.adoptionStatus]}>
                            {ADOPTION_STATUS_LABEL[adoption.adoptionStatus]}
                        </Badge>
                    </div>
                </div>

                <div className={styles.wrapper_btns}>
                    <Button variant="modal" size="small" onClick={handleDetail}>신청서 보기</Button>
                    {adoption.adoptionStatus !== "CANCELED" && <Button variant="danger" size="small" onClick={handleDelete}>신청 취소</Button>}
                </div>
            </div>
        </div>
    );
}