import { BadgeVariant } from "@/components/common/Badge";

export const ADOPTION_STATUS_LABEL: Record<string, string> = {
    "PENDING": "대기",
    "COUNSELING": "상담",
    "INTERVIEW": "면접",
    "ADDITIONAL_INTERVIEW": "추가 면접",
    "FOSTERING": "임시보호",
    "FINAL_REVIEW": "최종 심사",
    "APPROVED": "승인",
    "REJECTED": "거절",
    "CANCELED": "신청 취소",
};

export const ADOPTION_STATUS_BADGE_STYLE: Record<string, BadgeVariant> = {
    "PENDING": "completed",
    "COUNSELING": "success",
    "INTERVIEW": "success",
    "ADDITIONAL_INTERVIEW": "success",
    "FOSTERING": "success",
    "FINAL_REVIEW": "success",
    "APPROVED": "info",
    "REJECTED": "error",
    "CANCELED": "error",
};