# API 명세서

최신: 2026-07-10

| 기능 | 사용자 | 카테고리 | Method | URL | param/Query | 설명 | 기타 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 일반 회원가입 | 비회원 | 인증(Auth) | POST | /auth/register/user |  | 일반 사용자 회원가입 | 이메일 중복 확인 |
| 보호소 회원가입 | 비회원 | 인증(Auth) | POST | /auth/register/shelter |  | 보호소 관리자 회원가입 | 보호소 정보 포함 |
| 로그인 | 비회원 | 인증(Auth) | POST | /auth/login |  | 로그인 및 JWT발급 | Access/Refresh Token |
| 로그아웃 | 보호소관리자, 일반사용자 | 인증(Auth) | POST | /auth/logout |  | 로그아웃 처리 | Refresh Token 삭제 |
| 토큰 재발급 | 보호소관리자, 일반사용자 | 인증(Auth) | POST | /auth/refresh |  | Access Token 재발급 | Refresh Token 필요 |
| 내 정보 조회 | 보호소관리자, 일반사용자 | 회원(User) | GET | /users/me |  | 로그인한 사용자 정보 조회 | JWT 필요 |
| 개인 정보 수정 | 보호소관리자, 일반사용자 | 회원(User) | PATCH | /users/me |  | 닉네임, 이메일 등 수정 |  |
| 비밀번호 변경 | 보호소관리자, 일반사용자 | 회원(User) | PATCH | /users/password |  | 비밀번호 변경 | 현재 비밀번호 확인 |
| 보호소 목록 조회 | 전체 | 보호소(Shelter) | GET | /shelters | page | 보호소 목록 조회 | 페이지네이션 |
| 보호소 상세 조회 | 전체 | 보호소(Shelter) | GET | /shelters/:id | shelterId | 보호소 정보 조회 |  |
| 보호소 정보 수정 | 보호소관리자 | 보호소(Shelter) | PATCH | /shelters/:id | shelterId | 보호소 소개, 연락처 수정 | 본인 보호소만 가능 |
| 등록 동물 조회 | 전체 | 보호소(Shelter) | GET | /shelters/:id/animals | shelterId | 해당 보호소의 유기동물 조회 |  |
| 목록 조회 | 전체 | 보호동물(Animals) | GET | /animals | species, breed, gender, age, status, page | 검색 및 필터 조회 | 페이지네이션 |
| 상세 조회 | 전체 | 보호동물(Animals) | GET | /animals/:id | animalId | 보호동물 상세 정보 조회 |  |
| 보호동물 등록 | 보호소관리자 | 보호동물(Animals) | POST | /animals |  | 보호동물 등록 |  |
| 보호동물 수정 | 보호소관리자 | 보호동물(Animals) | PATCH | /animals/:id | animalId | 보호동물 정보 수정 |  |
| 보호동물 삭제 | 보호소관리자 | 보호동물(Animals) | DELETE | /animals/:id | animalId | 보호동물 게시글 삭제 |  |
| 입양상태 변경 | 보호소관리자 | 보호동물(Animals) | PATCH | /animals/:id/status | animalId | 공고중, 입양완료 등 상태변경 | 입양 승인/거절 시 사용 |
| 입양 신청 | 일반사용자 | 입양신청(Adoptions) | POST | /adoptions |  | 입양 신청서 제출 |  |
| 내 신청 목록 조회 | 일반사용자 | 입양신청(Adoptions) | GET | /adoptions |  | 본인의 신청 내역 조회 |  |
| 신청 상세 조회 | 보호소관리자, 일반사용자 | 입양신청(Adoptions) | GET | /adoptions/:id | adoptionId | 신청서 상세 조회 | 권한 확인 |
| 보호소 입양 신청 목록 | 보호소관리자 | 보호소(Shelter) | GET | /shelters/:id/adoptions | page, status | 해당 보호소 입양 신청 목록 조회 | 페이지네이션 |
| 신청 상태 변경 | 보호소관리자 | 입양신청(Adoptions) | PATCH | /adoptions/:id/status | adoptionId | 대기, 상담, 면접, 추가 면접, 임시 보호, 최종심사, 신청 취소, 승인, 거절 상태변경 |  |
| 성향테스트 제출 | 전체 | 성향테스트(Personality_test) | POST | /tests/personality |  | 테스트 결과 보내기 |  |
| 반려동물 게시글 목록 조회 | 전체 | 반려동물 게시판(Community) | GET | /petposts | page | 반려동물 게시판 목록 조회 | 페이지네이션 |
| 반려동물 게시글 상세 조회 | 전체 | 반려동물 게시판(Community) | GET | /petposts/:id | postId | 반려동물 게시글 상세 조회 |  |
| 반려동물 게시글 작성 | 일반사용자 | 반려동물 게시판(Community) | POST | /petposts |  | 반려동물 게시글 작성 | 로그인 필요 |
| 반려동물 게시글 수정 | 작성자 | 반려동물 게시판(Community) | PATCH | /petposts/:id | postId | 반려동물 게시글 수정 | 작성자만 가능 |
| 반려동물 게시글 삭제 | 작성자 | 반려동물 게시판(Community) | DELETE | /petposts/:id | postId | 반려동물 게시글 삭제 | 작성자만 가능 |
| AI 질의응답 | 전체 | AI 질문 답변(Chat) | POST | /ai/chat |  | 반려동물, 입양 관련 질문에 AI가 답변 | Azure OpenAI (확장 기능) |
| 반려동물 게시글 초안 생성 | 일반사용자 | AI 자동글쓰기 | POST | /ai/petposts/generate |  | 반려동물 게시판 게시글 초안 자동 생성 | Azure OpenAI |
| 성향 분석 생성 | 전체 | AI성향분석(LLM) | POST | /ai/tests/personality/analysis |  | 테스트 결과를 분석하여 성향 설명, 추천동물과의 매칭 이유, 입양전 고려사항 및 반려 생활 팁, AI 한마디 생성 | Azure OpenAI |
