// 입양 신청 상태 영문 한글
import { AdoptionStatus } from "@prisma/client";

export const ADOPTION_STATUS_LABEL: Record<AdoptionStatus, string> = {
    PENDING: "대기",
    COUNSELING: "상담",
    INTERVIEW: "면접",
    ADDITIONAL_INTERVIEW: "추가 면접",
    FOSTERING: "임시보호",
    FINAL_REVIEW: "최종 심사",
    APPROVED: "승인",
    REJECTED: "거절",
    CANCELED: "신청 취소",
}