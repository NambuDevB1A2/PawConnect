# DB Tables(ERD)

최신: 2026-07-17

| 링크 |
| --- |
| [https://www.erdcloud.com/d/JaFf77J4fzsK2XuXp](https://www.erdcloud.com/d/JaFf77J4fzsK2XuXp) |

### 사용자 / User

| 속성 이름(국문) | 속성 이름(영문) | PK | FK | 데이터 타입 | 기본값 | 제약조건 |
| --- | --- | --- | --- | --- | --- | --- |
| 사용자 고유번호 | id | TRUE | FALSE | UUID |  | NOT_NULL |
| 이메일 | email | FALSE | FALSE | VARCHAR(255) |  | NOT_NULL, UNIQUE |
| 수정 일시 | updatedAt | FALSE | FALSE | DATETIME | CURRENT_TIMESTAMP | NOT_NULL |
| 생성 일시 | createdAt | FALSE | FALSE | DATETIME | CURRENT_TIMESTAMP | NOT_NULL |
| 비밀번호 | password | FALSE | FALSE | VARCHAR(255) |  | NOT_NULL |
| 닉네임 | nickname | FALSE | FALSE | VARCHAR(20) |  | NOT_NULL |
| 역할 | role | FALSE | FALSE | ENUM(role) |  | NOT_NULL |
| 프로필 사진 | imgProfile | FALSE | FALSE | VARCHAR(100) | 임의의 기본 이미지 링크 | NOT_NULL |
| 보호소 고유번호 | shelterId | FALSE | TRUE | UUID |  |  |
| 회원 상태 | status | FALSE | FALSE | ENUM(userStatus) | ACTIVE | NOT_NULL |

### 약관 / Agreement

| 속성 이름(국문) | 속성 이름(영문) | PK | FK | 데이터 타입 | 기본값 | 제약조건 |
| --- | --- | --- | --- | --- | --- | --- |
| 약관 고유번호 | id | TRUE | FALSE | SMALLINT | AUTO_INCREMENT | NOT_NULL |
| 약관 제목 | title | FALSE | FALSE | VARCHAR(50) |  | NOT_NULL |
| 약관 내용 | content | FALSE | FALSE | TEXT |  |  |

### 회원 약관동의 / UserAgreement

| 속성 이름(국문) | 속성 이름(영문) | PK | FK | 데이터 타입 | 기본값 | 제약조건 |
| --- | --- | --- | --- | --- | --- | --- |
| 회원 약관동의 고유번호 | id | TRUE | FALSE | UUID |  | NOT_NULL |
| 약관 고유번호 | agreementId | FALSE | FALSE | SMALLINT |  | NOT_NULL |
| 회원 고유번호 | userId | FALSE | FALSE | UUID |  | NOT_NULL |
| 동의 여부 | isAgreed | FALSE | FALSE | BOOLEAN |  | NOT_NULL |
| 동의 일시 | agreedAt | FALSE | FALSE | DATETIME | CURRENT_TIMESTAMP | NOT_NULL |

### 보호소 / Shelter

| 속성 이름(국문) | 속성 이름(영문) | PK | FK | 데이터 타입 | 기본값 | 제약조건 |
| --- | --- | --- | --- | --- | --- | --- |
| 보호소 고유번호 | id | TRUE | FALSE | UUID |  | NOT_NULL |
| 보호소 이름 | name | FALSE | FALSE | VARCHAR(100) |  | NOT_NULL, UNIQUE |
| 주소 | adress | FALSE | FALSE | VARCHAR(255) |  | NOT_NULL |
| 상세 주소 | adressDetail | FALSE | FALSE | VARCHAR(255) |  |  |
| 전화번호 | phone | FALSE | FALSE | VARCHAR(20) |  | NOT_NULL |
| 운영시간 | operatingHours | FALSE | FALSE | VARCHAR(100) |  | NOT_NULL |
| 소개말 | description | FALSE | FALSE | VARCHAR(500) |  | NOT_NULL |
| 생성 일시 | createdAt | FALSE | FALSE | DATETIME | CURRENT_TIMESTAMP | NOT_NULL |
| 수정 일시 | updatedAt | FALSE | FALSE | DATETIME | CURRENT_TIMESTAMP | NOT_NULL |
| 보호소 배너 사진 | imgBanner | FALSE | FALSE | VARCHAR(100) |  | NOT_NULL |

### 보호소 사진 / ShelterImage

| 속성 이름(국문) | 속성 이름(영문) | PK | FK | 데이터 타입 | 기본값 | 제약조건 |
| --- | --- | --- | --- | --- | --- | --- |
| 보호소 사진 고유번호 | id | TRUE | FALSE | UUID |  | NOT_NULL |
| 보호소 고유번호 | shelterId | FALSE | TRUE | UUID |  | NOT_NULL |
| 사진 | img | FALSE | FALSE | VARCHAR(100) |  | NOT_NULL |

### 보호동물 동물 종류 / AnimalSpecies

| 속성 이름(국문) | 속성 이름(영문) | PK | FK | 데이터 타입 | 기본값 | 제약조건 |
| --- | --- | --- | --- | --- | --- | --- |
| 동물 종류 고유번호 | id | TRUE | FALSE | SMALLINT | AUTO_INCREMENT | NOT_NULL |
| 종류 이름 | name | FALSE | FALSE | VARCHAR(30) |  | NOT_NULL |

### 보호동물 품종 / AnimalBreed

| 속성 이름(국문) | 속성 이름(영문) | PK | FK | 데이터 타입 | 기본값 | 제약조건 |
| --- | --- | --- | --- | --- | --- | --- |
| 품종 고유번호 | id | TRUE | FALSE | SMALLINT | AUTO_INCREMENT | NOT_NULL |
| 품종 이름 | name | FALSE | FALSE | VARCHAR(30) |  | NOT_NULL |
| 동물 종류 | species | FALSE | TRUE | SMALLINT | AUTO_INCREMENT | NOT_NULL |

### 보호동물 / Animal

| 속성 이름(국문) | 속성 이름(영문) | PK | FK | 데이터 타입 | 기본값 | 제약조건 |
| --- | --- | --- | --- | --- | --- | --- |
| 보호동물 고유번호 | id | TRUE | FALSE | INT | AUTO_INCREMENT | NOT_NULL |
| 보호소 고유번호 | shelterId | FALSE | TRUE | UUID |  | NOT_NULL |
| 보호동물 이름 | name | FALSE | FALSE | VARCHAR(50) |  | NOT_NULL |
| 동물 종류 | species | FALSE | TRUE | SMALLINT |  | NOT_NULL, CHECK(=breed.species) |
| 품종 | breed | FALSE | TRUE | SMALLINT |  | NOT_NULL |
| 성별 | gender | FALSE | FALSE | ENUM(gender) |  | NOT_NULL |
| 중성화 여부 | isNeutered | FALSE | FALSE | BOOLEAN |  | NOT_NULL |
| 나이 | age | FALSE | FALSE | SMALLINT |  | NOT_NULL |
| 추정 나이 여부 | isEstimatedAge | FALSE | FALSE | BOOLEAN |  | NOT_NULL |
| 입양 상태 | animalStatus | FALSE | FALSE | ENUM(animalStatus) | PROTECTED | NOT_NULL |
| 몸무게 | weight | FALSE | FALSE | NUMBERIC(5 2) |  | NOT_NULL |
| 썸네일 이미지 | imgThumbnail | FALSE | FALSE | VARCHAR(100) |  | NOT_NULL |
| 상세 정보 | detailId | FALSE | TRUE | UUID |  | NOT_NULL, UNIQUE |
| 생성 일시 | createdAt | FALSE | FALSE | DATETIME | CURRENT_TIMESTAMP | NOT_NULL |
| 수정 일시 | updatedAt | FALSE | FALSE | DATETIME | CURRENT_TIMESTAMP | NOT_NULL |

### 보호동물 상세 정보 (성능 최적화용 분할) / AnimalDetail

| 속성 이름(국문) | 속성 이름(영문) | PK | FK | 데이터 타입 | 기본값 | 제약조건 |
| --- | --- | --- | --- | --- | --- | --- |
| 상세 정보 고유번호 | id | TRUE | FALSE | UUID |  | NOT_NULL |
| 공고 시작일 | falseticeStartDate | FALSE | FALSE | DATE |  | NOT_NULL |
| 공고 마감일 | falseticeEndDate | FALSE | FALSE | DATE |  | NOT_NULL |
| 발견장소 | foundLocation | FALSE | FALSE | VARCHAR(50) |  | NOT_NULL |
| 특이사항 | specialfalsetes | FALSE | FALSE | VARCHAR(100) |  | NOT_NULL |
| 소개말 | description | FALSE | FALSE | VARCHAR(500) |  | NOT_NULL |
| 건강상태 | healthStatus | FALSE | FALSE | VARCHAR(500) |  | NOT_NULL |
| 수정 일시 | updatedAt | FALSE | FALSE | DATETIME | CURRENT_TIMESTAMP | NOT_NULL |

### 보호동물 사진 / AnimalImage

| 속성 이름(국문) | 속성 이름(영문) | PK | FK | 데이터 타입 | 기본값 | 제약조건 |
| --- | --- | --- | --- | --- | --- | --- |
| 보호동물 사진 고유번호 | id | TRUE | FALSE | UUID |  | NOT_NULL |
| 보호동물 고유번호 | animalId | FALSE | TRUE | UUID |  | NOT_NULL |
| 사진 | img | FALSE | FALSE | VARCHAR(100) |  | NOT_NULL |

### 입양 신청 / Adoption

| 속성 이름(국문) | 속성 이름(영문) | PK | FK | 데이터 타입 | 기본값 | 제약조건 |
| --- | --- | --- | --- | --- | --- | --- |
| 입양 신청 고유번호 | id | TRUE | FALSE | UUID |  | NOT_NULL |
| 회원 고유번호 | userId | FALSE | TRUE | UUID |  | NOT_NULL |
| 보호동물 고유번호 | animalId | FALSE | TRUE | UUID |  | NOT_NULL |
| 신청 상태 | adoptionStatus | FALSE | FALSE | ENUM(adoptionStatus) | PENDING | NOT_NULL |
| 상세 정보 | detailId | FALSE | TRUE | UUID |  | NOT_NULL, UNIQUE |
| 생성 일시 | createdAt | FALSE | FALSE | DATETIME | CURRENT_TIMESTAMP | NOT_NULL |
| 수정 일시 | updatedAt | FALSE | FALSE | DATETIME | CURRENT_TIMESTAMP | NOT_NULL |

### 입양 신청 상세 정보 (성능 최적화용 분할) / AdoptionDetail

| 속성 이름(국문) | 속성 이름(영문) | PK | FK | 데이터 타입 | 기본값 | 제약조건 |
| --- | --- | --- | --- | --- | --- | --- |
| 상세 정보 고유번호 | id | TRUE | FALSE | UUID |  | NOT_NULL |
| 신청자 이름 | userName | FALSE | FALSE | VARCHAR(30) |  | NOT_NULL |
| 신청자 이메일 | email | FALSE | FALSE | VARCHAR(255) |  | NOT_NULL |
| 전화번호 | phone | FALSE | FALSE | VARCHAR(20) |  | NOT_NULL |
| 주소 | adress | FALSE | FALSE | VARCHAR(255) |  | NOT_NULL |
| 상세 주소 | adressDetail | FALSE | FALSE | VARCHAR(255) |  |  |
| 반려동물 양육 경험 여부 | petExperience | FALSE | FALSE | ENUM(petExperience) |  | NOT_NULL |
| 반려동물 양육 경험 상세 | petsDescription | FALSE | FALSE | VARCHAR(100) |  |  |
| 반려동물 양육 경험 기간 | petExperiencePeriod | FALSE | FALSE | ENUM(petExperience) |  |  |
| 거주 형태 | residenceType | FALSE | FALSE | ENUM(residenceType) |  | NOT_NULL |
| 반려동물 사육 가능 여부 | petAllowedStatus | FALSE | FALSE | ENUM(petAllowedStatus) |  | NOT_NULL |
| 가족 구성 | familySize | FALSE | FALSE | ENUM(familySize) |  | NOT_NULL |
| 어린 아이 여부 | youngChildStatus | FALSE | FALSE | ENUM(youngChildStatus) |  | NOT_NULL |
| 가족 동의 여부 | isFamilyConsent | FALSE | FALSE | BOOLEAN |  | NOT_NULL |
| 입양 목적 | adoptionPurpose | FALSE | FALSE | VARCHAR(100) |  | NOT_NULL |
| 예방접종 가능 | isCanVaccinate | FALSE | FALSE | BOOLEAN |  | NOT_NULL |
| 병원 치료 가능 | isCanProvideMedicalCare | FALSE | FALSE | BOOLEAN |  | NOT_NULL |
| 산책 및 운동 가능 | isCanProvideExercise | FALSE | FALSE | BOOLEAN |  | NOT_NULL |
| 평생 책임 양육 동의 | isAcceptLifetimeResponsibility | FALSE | FALSE | BOOLEAN |  | NOT_NULL |
| 추가 전달사항 | additionalfalsetes | FALSE | FALSE | VARCHAR(500) |  | NOT_NULL |
| 수정 일시 | updatedAt | FALSE | FALSE | DATETIME | CURRENT_TIMESTAMP | NOT_NULL |

### 입양 신청 약관동의 / AdoptionAgreement

| 속성 이름(국문) | 속성 이름(영문) | PK | FK | 데이터 타입 | 기본값 | 제약조건 |
| --- | --- | --- | --- | --- | --- | --- |
| 입양 신청 약관동의 고유번호 | id | TRUE | FALSE | UUID |  | NOT_NULL |
| 약관 고유번호 | agreementId | FALSE | TRUE | SMALLINT |  | NOT_NULL |
| 입양 신청 고유번호 | adoptionId | FALSE | TRUE | UUID |  | NOT_NULL |
| 동의 여부 | isAgreed | FALSE | FALSE | BOOLEAN |  | NOT_NULL |
| 동의 일시 | agreedAt | FALSE | FALSE | DATETIME | CURRENT_TIMESTAMP | NOT_NULL |

### 반려동물 자랑 게시글 / PetPost

| 속성 이름(국문) | 속성 이름(영문) | PK | FK | 데이터 타입 | 기본값 | 제약조건 |
| --- | --- | --- | --- | --- | --- | --- |
| 자랑 게시글 고유번호 | id | TRUE | FALSE | INT | AUTO_INCREMENT | NOT_NULL |
| 작성자 고유번호 | authorId | FALSE | TRUE | UUID |  | NOT_NULL |
| 제목 | title | FALSE | FALSE | VARCHAR(50) |  | NOT_NULL |
| 내용 | content | FALSE | FALSE | VARCHAR(500) |  | NOT_NULL |
| 생성 일시 | createdAt | FALSE | FALSE | DATETIME | CURRENT_TIMESTAMP | NOT_NULL |
| 수정 일시 | updatedAt | FALSE | FALSE | DATETIME | CURRENT_TIMESTAMP | NOT_NULL |

### 반려동물 자랑 게시글 사진 / PetPostImage

| 속성 이름(국문) | 속성 이름(영문) | PK | FK | 데이터 타입 | 기본값 | 제약조건 |
| --- | --- | --- | --- | --- | --- | --- |
| 자랑 게시글 사진 고유번호 | id | TRUE | FALSE | UUID |  | NOT_NULL |
| 자랑 게시글 고유번호 | petPostId | FALSE | TRUE | INT | AUTO_INCREMENT | NOT_NULL |
| 사진 | img | FALSE | FALSE | VARCHAR(100) |  | NOT_NULL |
