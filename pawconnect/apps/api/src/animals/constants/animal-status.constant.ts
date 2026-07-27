// 동물상태 영문 한글
import { AnimalStatus } from "@prisma/client";

export const ANIMAL_STATUS_LABEL: Record<AnimalStatus, string> = {
    PROTECTED: "보호중",
    AVAILABLE: "공고중", //(입양 가능)
    ADOPTED: "입양 완료",
    REUNITED: "귀가 완료",
    DECEASED: "자연사",
    EUTHANIZED: "안락사",
}