import { BadgeVariant } from "@/components/common/Badge";

export const ANIMAL_STATUS_LABEL: Record<string, string> = {
    "PROTECTED": "보호중",
    "AVAILABLE": "공고중", //(입양 가능)
    "ADOPTED": "입양 완료",
    "REUNITED": "귀가 완료",
    "DECEASED": "자연사",
    "EUTHANIZED": "안락사",
};

export const ANIMAL_STATUS_BADGE_STYLE: Record<string, BadgeVariant> = {
    "PROTECTED": "info",        // 보호중 (파란색)
    "AVAILABLE": "success",     // 공고중 / 입양가능 (초록)
    "ADOPTED": "completed",     // 입양완료 (회색)
    "REUNITED": "completed",    // 귀가완료 (회색)
    "DECEASED": "error",        // 자연사 (빨강)
};