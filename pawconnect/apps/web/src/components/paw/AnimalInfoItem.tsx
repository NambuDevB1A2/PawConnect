// 상세조회 정보 아이템

import { AnimalStatus } from "@/types/paw/animal.type";
import Typography from "../common/Typography";
import styles from '@/styles/paw/pawDetail.module.css';
import badgeStyles from "@/styles/common/Badge.module.css";
import { ANIMAL_STATUS_BADGE_STYLE } from "@/constants/badge";

interface AnimalInfoItemProps {
    label: string;
    value?: string;
}

export function AnimalInfoItem({ label, value }: AnimalInfoItemProps) {
    return (
        <div className={styles.item}>
            <Typography className={styles.label} variant="body1">{label}</Typography>
            <Typography className={styles.value} variant="body1">{value ?? "-"}</Typography>
        </div>
    );
}

interface AnimalStatusBadgeProps {
    status: AnimalStatus;
    statusLabel: string;
    endDate?: string;
    showDday?: boolean;
}

// 상세조회 뱃지
export function AnimalStatusBadge({ status, statusLabel, endDate, showDday=false }: AnimalStatusBadgeProps) {
    // 디데이 계산(마감일-오늘날짜 / 년일시초)
    const today = new Date();
    const end = endDate ? new Date(endDate) : null;
    const diff = end ? Math.ceil(
        (end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) : null;
    const dday = diff === null? "" : diff>0 ? `D+${diff}` : 
                diff === 0? "D-Day" : `D-${Math.abs(diff)}`; 

    return (
        <div className={styles.badgeWrapper}>
            {/* 동물상태 뱃지 */}
            <div className={`${badgeStyles.badge} ${badgeStyles.medium} 
                ${ANIMAL_STATUS_BADGE_STYLE[status]}`}> {statusLabel}
            </div>
            {/* 디데이 */}
            {showDday && status === 'AVAILABLE' && diff !== null && (
                <Typography className={styles.dday} variant="menutitle" weight="medium">
                    {dday}</Typography>
            )}
        </div>
    );
}