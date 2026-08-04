// 보호동물 상세 페이지 오른쪽 정보 구역
'use client'
import { AnimalDetail } from "@/types/paw/animal-detail.type";
import { AnimalInfoItem, AnimalStatusBadge } from "./AnimalInfoItem";
import Button from "@/components/common/Button";
import styles from '@/styles/paw/pawDetail.module.css'
import Typography from "../common/Typography";
import { formatDate } from "@/utils/format.util";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { ModalContext } from "@/providers/ModalProvider";


interface AnimalInfoCardProps {
    animal: AnimalDetail;
}

export default function AnimalInfoCard({ animal }: AnimalInfoCardProps) {
    const router = useRouter();
    const isAvailable = animal.animalStatus === 'AVAILABLE';
    // 로그인 여부 확인
    const { login } = useContext(AuthContext);
    // 로그인 모달
    const { openModal } = useContext(ModalContext);

    // 입양신청하기 실행
    const handleApply = () => {
        // 로그인 안 되어 있으면 로그인 페이지로 이동
        if (!login) {
            openModal("loginRequired"); //undefined
            return;
        }
        // 로그인되어 있으면 입양신청 페이지로 이동
        router.push(`/adopt/new?animalId=${animal.id}`);
    }

    return (
        <div className={styles.infoCard}>
            {/* 입양뱃지 D-7 */}
            <AnimalStatusBadge status={animal.animalStatus} statusLabel={animal.animalStatusLabel}
                endDate={animal.noticeEndDate} showDday />

            {/* 동물이름 품종/성별(중성화여부)/나이/몸무게 */}
            <div>
                <Typography variant="subtitle">{animal.name}</Typography>
                <Typography variant="body1">
                    {animal.breed} ·
                    {animal.gender === "MALE" ? "남아" : "여아"}
                    {animal.isNeutered ? "(중성화 O)" : "(중성화 X)"} ·
                    {animal.age} 개월 ·
                    {animal.weight} kg</Typography>
            </div>

            <div className={styles.shelterSection}>
                <div className={styles.box_typo}>
                    <AnimalInfoItem label="공고기간"
                        value={
                            animal.noticeStartDate && animal.noticeEndDate ?
                                `${formatDate(animal.noticeStartDate)} ~ ${formatDate(animal.noticeEndDate)}`
                                : "-"
                        } />

                    <AnimalInfoItem label="상태" value={animal.animalStatusLabel} />

                    <AnimalInfoItem label="발견장소" value={animal.foundLocation ?? "-"} />

                    <AnimalInfoItem label="특이사항" value={animal.specialNotes ?? "-"} />

                    <AnimalInfoItem label="보호센터" value={animal.shelterName} />
                </div>
            </div>
            <div>
                {/* // 입양신청하기 버튼 */}
                {/* 로그인 여부 확인 후 이동 */}
                <Button fullWidth className={styles.searchButton} variant="primary"
                    disabled={!isAvailable}
                    onClick={handleApply}>
                    입양 신청</Button>
            </div>
        </div>
    );
}