import badgeStyles from "@/styles/common/Badge.module.css";
import { AnimalStatus } from "@/types/paw/animal.type";

// 보호동물 상태별 Badge 스타일
export const ANIMAL_STATUS_BADGE_STYLE = {
    PROTECTED: badgeStyles.info,        // 보호중 (파란색)
    AVAILABLE: badgeStyles.success,     // 공고중 / 입양가능 (초록)
    ADOPTED: badgeStyles.completed,     // 입양완료 (회색)
    REUNITED: badgeStyles.completed,    // 귀가완료 (회색)
    DECEASED: badgeStyles.error,        // 자연사 (빨강)
    EUTHANIZED: badgeStyles.warning,    // 안락사 (노랑/주황)
} satisfies Record<AnimalStatus, string>;