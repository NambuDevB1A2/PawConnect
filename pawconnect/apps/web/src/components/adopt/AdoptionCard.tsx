'use client';

import AppImage from "@/components/common/AppImage";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import IconButton from "@/components/common/IconButton";
import Select from "@/components/common/Select";
import Typography from "@/components/common/Typography";
import { ADOPTION_STATUS_BADGE_STYLE, ADOPTION_STATUS_LABEL } from "@/constants/adopt/adopt-badge.constants";
import { MODAL_MESSAGES } from "@/constants/messages/Modal";
import { ANIMAL_STATUS_BADGE_STYLE, ANIMAL_STATUS_LABEL } from "@/constants/paw/animal-badge.constants";
import { ModalContext } from "@/providers/ModalProvider";
import { CancelAdoption } from "@/services/adopt/cancel-adoption.client";
import { UpdateAdoptionStatus } from "@/services/adopt/update-adoption-status.client";
import styles from "@/styles/adopt/AdoptionCard.module.css"
import { Adoption, AdoptionStatus } from "@/types/adopt/adoption.type";
import { AnimalStatus } from "@/types/paw/animal.type";
import { formatDateTime } from "@/utils/format.util";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

interface AdoptionCardProps {
    role: "USER" | "SHELTER",
    adoption: Adoption;
}

export default function AdoptionCard({ role, adoption }: AdoptionCardProps) {
    const { openModal } = useContext(ModalContext);
    const [animalStatus, setAnimalStatus] = useState<AnimalStatus>(adoption.animal.animalStatus);
    const [adoptionStatus, setAdoptionStatus] = useState<AdoptionStatus>(adoption.adoptionStatus);

    const isDisabled = 
        adoption.adoptionStatus === "CANCELED" ||
        adoption.adoptionStatus === "APPROVED" ||
        adoption.adoptionStatus === "REJECTED";

    useEffect(() => {
        setAnimalStatus(adoption.animal.animalStatus);
        setAdoptionStatus(adoption.adoptionStatus);
    }, [adoption.animal.animalStatus, adoption.adoptionStatus]);
    
    const router = useRouter();

    const handleDetail = () => {
        openModal("adoptionDetail", {
            adoptionId: adoption.id,
        });
    };

    const handleCancel = () => {
        openModal("confirmDelete", {
            onConfirm: handleConfirmCancel,

            header: MODAL_MESSAGES.confirmAdoptionDelete.header,
            body: MODAL_MESSAGES.confirmAdoptionDelete.body,
            confirm: MODAL_MESSAGES.confirmAdoptionDelete.confirm,
        });
    };

    const handleConfirmCancel = async () => {
        if (isDisabled) return;

        const res = await CancelAdoption(adoption.id);

        if (res.success) {
            alert('성공적으로 신청을 취소했습니다');
            router.refresh();
        }
        else {
            alert('신청 취소 도중 오류가 발생했습니다');
        }
    };

    const handleSave = async () => {
        if (isDisabled) return;

        if (adoption.adoptionStatus === adoptionStatus &&
            adoption.animal.animalStatus === animalStatus
        ) return;

        const res = await UpdateAdoptionStatus(adoption.id, animalStatus, adoptionStatus);

        if (res.success) {
            alert('성공적으로 상태를 변경했습니다');
            router.refresh();
        }
        else {
            alert('상태 변경 도중 오류가 발생했습니다');
        }
    };

    return (
        <div className={`${styles.wrapper_adoption_card} ${isDisabled ? styles.disabled : ""}`}>
            <div className={styles.wrapper_image}>
                <AppImage className={styles.img_animal} src={adoption.animal.imgThumbnail} />
            </div>

            <div className={styles.wrapper_info}>
                <div className={styles.box_info}>
                    <Typography className={styles.typo_detail}>[{adoption.animal.animalSpecies.name}] {adoption.animal.animalBreed.name}</Typography>
                    <Typography className={styles.typo_animal_name} variant="subtitle">{adoption.animal.name}</Typography>
                    <div className={styles.box_typo}>
                        <Typography className={styles.typo_detail_title}>신청일</Typography>
                        <Typography className={styles.typo_detail}>{formatDateTime(adoption.createdAt)}</Typography>
                    </div>

                    {role === "USER" &&
                    <div className={styles.box_typo}>
                        <Typography className={styles.typo_detail_title}>소속 보호소</Typography>
                        <Typography className={`${styles.typo_detail} ${styles.typo_shelter_name}`}>{adoption.animal.shelter.name}</Typography>
                    </div>}

                    
                    <div className={styles.wrapper_badge}>
                        
                        <div className={styles.box_badge}>
                            {role === "USER" && <Typography className={styles.typo_badge_title} weight="semibold">동물 입양 상태</Typography>}
                            {role === "USER" && 
                                <Badge className={styles.badge}
                                    variant={ANIMAL_STATUS_BADGE_STYLE[adoption.animal.animalStatus]}>
                                    {ANIMAL_STATUS_LABEL[adoption.animal.animalStatus]}
                                </Badge>}
                            {role === "SHELTER" && 
                                <Select
                                    labelText="동물 입양 상태"
                                    labelSize="small"
                                    className={styles.select_status}
                                    value={animalStatus}
                                    onChange={(value) => setAnimalStatus(value as AnimalStatus)}
                                    disabled={isDisabled}
                                    options={[
                                        { label: "보호중", value: "PROTECTED" },
                                        { label: "공고중", value: "AVAILABLE" },
                                        { label: "입양 완료", value: "ADOPTED" },
                                        { label: "귀가 완료", value: "REUNITED" },
                                        { label: "자연사", value: "DECEASED" },
                                        { label: "안락사", value: "EUTHANIZED" },
                                    ]}
                                />}
                        </div>
                        
                        <div className={styles.box_badge}>
                            {role === "USER" && <Typography className={styles.typo_badge_title} weight="semibold">신청 상태</Typography>}
                            {role === "USER" && 
                                <Badge  className={styles.badge}
                                    variant={ADOPTION_STATUS_BADGE_STYLE[adoption.adoptionStatus]}>
                                    {ADOPTION_STATUS_LABEL[adoption.adoptionStatus]}
                                </Badge>}
                            {role === "SHELTER" && 
                                <Select
                                    labelText="신청 상태"
                                    labelSize="small"
                                    className={styles.select_status}
                                    value={adoptionStatus}
                                    onChange={(value) => setAdoptionStatus(value as AdoptionStatus)}
                                    disabled={isDisabled}
                                    options={[
                                        { label: "대기", value: "PENDING" },
                                        { label: "상담", value: "COUNSELING" },
                                        { label: "면접", value: "INTERVIEW" },
                                        { label: "추가 면접", value: "ADDITIONAL_INTERVIEW" },
                                        { label: "임시보호", value: "FOSTERING" },
                                        { label: "최종 심사", value: "FINAL_REVIEW" },
                                        { label: "승인", value: "APPROVED" },
                                        { label: "거절", value: "REJECTED" },
                                        { label: "신청 취소", value: "CANCELED", disabled: true },
                                    ]}
                                />}
                        </div>
                        
                        {role === "SHELTER" && 
                            <IconButton name="save" 
                            disabled={(adoption.adoptionStatus === adoptionStatus && adoption.animal.animalStatus === animalStatus) || 
                                isDisabled }
                            onClick={handleSave}
                            />}
                    </div>
                </div>

                <div className={styles.wrapper_btns}>
                    <Button variant="modal" size="small" onClick={handleDetail}>신청서 보기</Button>
                    {role === "USER" && !isDisabled && 
                        <Button variant="danger" size="small" onClick={handleCancel}>신청 취소</Button>}
                </div>
            </div>
        </div>
    );
}