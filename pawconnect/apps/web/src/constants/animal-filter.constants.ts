// 동물 필터 상수들

// 동물 품종
export const DOG_BREEDS = [
    { label: "믹스견", value: "1" },
    { label: "말티즈", value: "2" },
    { label: "푸들", value: "3" },
    { label: "포메라니안", value: "4" },
    { label: "진돗개", value: "5" },
    { label: "시츄", value: "6" },
    { label: "치와와", value: "7" },
    { label: "코카스파니엘", value: "8" },
    { label: "웰시코기", value: "9" },
    { label: "리트리버", value: "10" },
]

export const CAT_BREEDS = [
    { label: "코리안숏헤어", value: "11" },
    { label: "러시안블루", value: "12" },
    { label: "페르시안", value: "13" },
    { label: "브리티시숏헤어", value: "14" },
    { label: "먼치킨", value: "15" },
    { label: "스코티시폴드", value: "16" },
]

// 성별(중성화) 옵션
export const GENDER_OPTIONS = [
    { label: "성별 선택", value: "UNKNOWN_FALSE" },
    { label: "여아(중성화 O)", value: "FEMALE_TRUE" },
    { label: "여아(중성화 X)", value: "FEMALE_FALSE" },
    { label: "남아(중성화 O)", value: "MALE_TRUE" },
    { label: "남아(중성화 X)", value: "MALE_FALSE" },
];


// 나이 옵션
export const AGE_OPTIONS = [
    { label: "0~6개월", value: "1" },
    { label: "6개월~1년", value: "2" },
    { label: "1~7세", value: "3" },
    { label: "7세 이상", value: "4" },
    // { label: "확인 불가", value: "5" },
]

// 상태 옵션
export const STATUS_OPTIONS = [
    { label: "보호중", value: "PROTECTED" },
    { label: "공고중", value: "AVAILABLE" },
    { label: "입양완료", value: "ADOPTED" },
    { label: "귀가완료", value: "REUNITED" },
    { label: "자연사", value: "DECEASED" },
    { label: "안락사", value: "EUTHANIZED" },
]