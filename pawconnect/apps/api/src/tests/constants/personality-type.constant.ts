// MBTI 타입 정보

export interface PersonalityType {
    mbti: string;
    title: string;
    breedId: number;
    breed: string;
    keywords: string[];
}

export const PERSONALITY_TYPES: Record<string, PersonalityType> = {
    ISTJ: {
        mbti: "ISTJ",
        title: "믿음직한 진돗개형",
        breedId: 5,
        breed: "진돗개",
        keywords: [
            "책임감",
            "신중함",
            "안정적",
            "계획적"
        ],
    },

    ISFJ: {
        mbti: "ISFJ",
        title: "포근한 코리안숏헤어형",
        breedId: 11,
        breed: "코리안숏헤어",
        keywords: [
            "배려심",
            "따뜻함",
            "헌신적",
            "안정감"
        ],
    },

    INFJ: {
        mbti: "INFJ",
        title: "따뜻한 브리티시숏헤어형",
        breedId: 14,
        breed: "브리티시숏헤어",
        keywords: [
            "공감",
            "통찰력",
            "차분함",
            "이상적"
        ],
    },

    INTJ: {
        mbti: "INTJ",
        title: "고요한 러시안블루형",
        breedId: 12,
        breed: "러시안블루",
        keywords: [
            "분석적",
            "독립적",
            "전략적",
            "신중함"
        ],
    },

    ISTP: {
        mbti: "ISTP",
        title: "자유로운 믹스견형",
        breedId: 1,
        breed: "믹스견",
        keywords: [
            "자유로움",
            "실용적",
            "도전적",
            "유연함"
        ],
    },

    ISFP: {
        mbti: "ISFP",
        title: "평온한 말티즈형",
        breedId: 2,
        breed: "말티즈",
        keywords: [
            "온화함",
            "감성적",
            "배려",
            "평화로움"
        ],
    },

    INFP: {
        mbti: "INFP",
        title: "다정한 시츄형",
        breedId: 6,
        breed: "시츄",
        keywords: [
            "다정함",
            "이해심",
            "순수함",
            "이상주의"
        ],
    },

    INTP: {
        mbti: "INTP",
        title: "호기심 많은 코리안숏헤어형",
        breedId: 11,
        breed: "코리안숏헤어",
        keywords: [
            "호기심",
            "논리적",
            "창의적",
            "탐구심"
        ],
    },

    ESTP: {
        mbti: "ESTP",
        title: "질주하는 웰시코기형",
        breedId: 9,
        breed: "웰시코기",
        keywords: [
            "활동적",
            "도전적",
            "순발력",
            "에너지"
        ],
    },

    ESFP: {
        mbti: "ESFP",
        title: "햇살 포메라니안형",
        breedId: 4,
        breed: "포메라니안",
        keywords: [
            "사교성",
            "밝음",
            "긍정적",
            "즐거움"
        ],
    },

    ENFP: {
        mbti: "ENFP",
        title: "반짝이는 리트리버형",
        breedId: 10,
        breed: "리트리버",
        keywords: [
            "활동적",
            "친화적",
            "새로운 경험",
            "에너지 넘침"
        ],
    },

    ENTP: {
        mbti: "ENTP",
        title: "장난꾸러기 푸들형",
        breedId: 3,
        breed: "푸들",
        keywords: [
            "창의적",
            "재치",
            "호기심",
            "도전정신"
        ],
    },

    ESTJ: {
        mbti: "ESTJ",
        title: "든든한 진돗개형",
        breedId: 5,
        breed: "진돗개",
        keywords: [
            "책임감",
            "리더십",
            "체계적",
            "실행력"
        ],
    },

    ESFJ: {
        mbti: "ESFJ",
        title: "사랑스러운 페르시안형",
        breedId: 13,
        breed: "페르시안",
        keywords: [
            "친절함",
            "배려",
            "사교성",
            "정이 많음"
        ],
    },

    ENFJ: {
        mbti: "ENFJ",
        title: "마음을 잇는 리트리버형",
        breedId: 10,
        breed: "리트리버",
        keywords: [
            "리더십",
            "공감",
            "배려",
            "사람 중심"
        ],
    },

    ENTJ: {
        mbti: "ENTJ",
        title: "당당한 코카스파니엘형",
        breedId: 8,
        breed: "코카스파니엘",
        keywords: [
            "리더십",
            "목표지향",
            "결단력",
            "도전정신"
        ],
    },
};