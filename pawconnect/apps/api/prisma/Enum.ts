
// 
// Enums
//

// 회원 역할
enum Role {
  USER, // 알반 사용자
  SHELTER, // 보호소 관리자
  ADMIN, // 홈페이지 관리자
}

// 회원 상태
enum UserStatus {
  ACTIVE, // 정상 이용
  SUSPENDED, // 이용 정지
  INACTIVE, // 휴면 상태
  WITHDRAWN, // 탈퇴
}

// 보호동물 입양 상태
enum AnimalStatus {
  PROTECTED, // 보호중
  AVAILABLE, // 공고중(입양 가능)
  ADOPTED, // 입양 완료
  REUNITED, // 귀가 완료
  DECEASED, // 자연사
  EUTHANIZED, // 안락사
}

// 보호동물 성별
enum AnimalGender {
  MALE, // 남아
  FEMALE, // 여아
  UNKNOWN, // 미확인
}

// 입양 신청 상태
enum AdoptionStatus {
  PENDING, // 대기
  COUNSELING, // 상담
  INTERVIEW, // 면접
  ADDITIONAL_INTERVIEW, // 추가 면접
  FOSTERING, // 임시 보호
  FINAL_REVIEW, // 최종 심사
  APPROVED, // 승인
  REJECTED, // 거절
  CANCELED, // 신청 취수
}

// 반려동물 양육 경험 여부
enum PetExperience {
  NONE, // 처음 키움
  PAST, // 과거에 키움
  CURRENT, // 현재도 키움
}

// 반려동물 양육 경험 기간
enum PetExperiencePeriod {
  LESS_THAN_1_YEAR, // 1년 미만
  ONE_TO_THREE_YEARS, // 1~3년
  THREE_TO_FIVE_YEARS, // 3~5년
  OVER_FIVE_YEARS, // 5년 이상
}

// 거주 형태
enum ResidenceType {
  APARTMENT, // 아파트
  VILLA, // 빌라
  DETACHED_HOUSE, // 단독주택
  OFFICETEL, // 오피스텔
  DORMITORY, // 기숙사
}

// 반려동물 사육 가능 여부
enum PetAllowedStatus {
  ALLOWED, // 가능
  NOT_ALLOWED, // 불가능
  NEED_CONFIRMATION, // 확인 필요
}

// 가족 구성
enum FamilySize {
  ONE, // 1명
  TWO, // 2명
  THREE, // 3명
  FOUR_OR_MORE, // 4명 이상
}

// 어린 아이 여부
enum YoungChildStatus {
  NONE, // 없음
  UNDER_SEVEN, // 7세 미만
  SEVEN_OR_OLDER, // 7세 이상
}
