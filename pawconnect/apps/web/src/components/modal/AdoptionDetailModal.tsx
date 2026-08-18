'use client';

import Typography from "@/components/common/Typography";
import Modal from "@/components/modal/Modal";
import Button from "@/components/common/Button";
import { MODAL_MESSAGES } from "@/constants/messages/Modal";
import { GetAdoption } from "@/services/adopt/get-adoption.server";
import AdoptFormReadOnly from "@/components/adopt/AdoptFormReadOnly";
import { useEffect, useState } from "react";
import { Adoption } from "@/types/adopt/adoption.type";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import styles from "@/styles/modal/AdoptionDetailModal.module.css"

interface AdoptionDetailModalProps {
    adoptionId: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function AdoptionDetailModal({ adoptionId, isOpen, onClose }: AdoptionDetailModalProps) {
    const [adoption, setAdoption] = useState<Adoption | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 모달이 열려있을 때만 데이터 로드
        if (!isOpen) return;

        let cancelled = false;

        const fetchAdoption = async () => {
            setIsLoading(true);
            const response = await GetAdoption(adoptionId);
            if (!cancelled) {
                setAdoption(response?.adoption ?? null);
                setIsLoading(false);
            }
        };

        fetchAdoption();

        return () => {
            cancelled = true;
        };
    }, [adoptionId, isOpen]);

    
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="large">
            <Modal.Header>
                <Typography variant="modaltitle">{MODAL_MESSAGES.adoptionDetail.header}</Typography>
            </Modal.Header>
            <Modal.Body>
                {isLoading && <LoadingSpinner/>}
                {!isLoading && !adoption && <Typography>상세 내용을 불러올 수 없습니다.</Typography>}
                {!isLoading && adoption &&
                <div className={styles.wrapper_scroll}>
                    <AdoptFormReadOnly
                        className={styles.section}

                        userName={adoption.detail.userName}
                        phone={adoption.detail.phone}
                        email={adoption.detail.email}
                        address={adoption.detail.address}
                        addressDetail={adoption.detail.addressDetail}

                        petExperience={adoption.detail.petExperience}
                        petsDescription={adoption.detail.petsDescription}
                        petExperiencePeriod={adoption.detail.petExperiencePeriod}

                        residenceType={adoption.detail.residenceType}
                        petAllowedStatus={adoption.detail.petAllowedStatus}
                        familySize={adoption.detail.familySize}
                        youngChildStatus={adoption.detail.youngChildStatus}
                        isFamilyConsent={adoption.detail.isFamilyConsent ? "true" : "false"}

                        adoptionPurpose={adoption.detail.adoptionPurpose}
                        isCanVaccinate={adoption.detail.isCanVaccinate}
                        isCanProvideMedicalCare={adoption.detail.isCanProvideMedicalCare}
                        isCanProvideExercise={adoption.detail.isCanProvideExercise}
                        isAcceptLifetimeResponsibility={adoption.detail.isAcceptLifetimeResponsibility}
                        additionalNotes={adoption.detail.additionalNotes}
                    />
                </div>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="modal" onClick={onClose}>{MODAL_MESSAGES.adoptionDetail.close}</Button>
            </Modal.Footer>
        </Modal>
    );
}