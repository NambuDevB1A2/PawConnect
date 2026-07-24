
DELETE FROM "User";
DELETE FROM "Shelter";
DELETE FROM "ShelterImage";

INSERT INTO "Shelter" (
    id, name, address, "addressDetail", phone,
    "operatingHours", description, "imgBanner",
    "createdAt", "updatedAt"
) VALUES
(
    gen_random_uuid(),
    '행복한 발자국 보호센터',
    '서울특별시 강남구 테헤란로 123',
    '3층 301호',
    '0212345678',
    '매주 화-일 10:00~18:00 (월요일 휴무)',
    '유기동물의 새로운 가족을 찾아주는 따뜻한 보호소입니다. 다양한 견종과 묘종을 보호하고 있으며, 입양 전 건강검진과 예방접종을 완료합니다.',
    'shelter/banner/default_banner.png',
    now(), now()
),
(
    gen_random_uuid(),
    '사랑모아 동물보호소',
    '경기도 성남시 분당구 판교역로 45',
    '지하 1층',
    '0319876543',
    '매일 09:00~19:00 (연중무휴)',
    '10년째 유기동물을 보호하며 새 가족을 찾아주고 있습니다. 봉사자와 함께 동물들의 사회화 훈련도 진행하고 있습니다.',
    'shelter/banner/default_banner.png',
    now(), now()
),
(
    gen_random_uuid(),
    '노란리본 보호센터',
    '부산광역시 해운대구 centum중앙로 78',
    '2층',
    '0515557788',
    '매주 월-토 10:00~17:00 (일요일 휴무)',
    '유기견, 유기묘뿐만 아니라 특수동물도 함께 보호하는 지역 보호소입니다. 입양 후에도 지속적인 사후관리를 제공합니다.',
    'shelter/banner/default_banner.png',
    now(), now()
),
(
    gen_random_uuid(),
    '푸른숲 동물사랑센터',
    '인천광역시 연수구 송도과학로 12',
    '1층 로비 옆',
    '0324443322',
    '매주 화-일 09:30~18:30 (월요일 휴무)',
    '자연친화적인 환경에서 동물들을 보호하며, 정기적으로 입양 캠페인과 봉사활동을 진행합니다.',
    'shelter/banner/default_banner.png',
    now(), now()
),
(
    gen_random_uuid(),
    '희망나눔 보호소',
    '대구광역시 수성구 동대구로 99',
    '4층 401호',
    '0536667799',
    '매일 10:00~18:00 (공휴일 휴무)',
    '지역 주민들과 함께 운영되는 소규모 보호소로, 모든 동물에게 개별 맞춤 케어를 제공하고 있습니다.',
    'shelter/banner/default_banner.png',
    now(), now()
);

INSERT INTO "Shelter" (
    id, name, address, "addressDetail", phone,
    "operatingHours", description, "imgBanner",
    "createdAt", "updatedAt"
) VALUES
(
    gen_random_uuid(),
    '초록언덕 보호센터',
    '서울특별시 마포구 월드컵로 56',
    '5층',
    '0223339988',
    '매주 수-월 10:00~19:00 (화요일 휴무)',
    '도심 속 작은 쉼터를 표방하며, 유기동물들이 안정을 찾을 수 있도록 조용하고 넓은 공간을 제공합니다.',
    'shelter/banner/default_banner.png',
    now(), now()
),
(
    gen_random_uuid(),
    '다솜 유기동물보호소',
    '광주광역시 서구 상무중앙로 34',
    '지상 2층',
    '0625558811',
    '매일 09:00~18:00 (연중무휴)',
    '지자체와 협력하여 운영되는 대규모 보호소로, 대형견부터 소형묘까지 폭넓게 보호하고 있습니다.',
    'shelter/banner/default_banner.png',
    now(), now()
),
(
    gen_random_uuid(),
    '함께하개 보호센터',
    '대전광역시 유성구 대학로 88',
    '1층 정문 옆',
    '0428887766',
    '매주 목-화 10:00~17:30 (수요일 휴무)',
    '대학생 봉사자들과 함께 운영되며, 유기견 행동교정 프로그램을 함께 진행하는 보호소입니다.',
    'shelter/banner/default_banner.png',
    now(), now()
),
(
    gen_random_uuid(),
    '나비야놀자 고양이보호센터',
    '경기도 수원시 영통구 광교로 21',
    '3층 302호',
    '0314445566',
    '매주 화-일 11:00~19:00 (월요일 휴무)',
    '고양이 전문 보호소로, 입양 전 중성화 수술과 건강검진을 완료한 후 새로운 가족을 찾아줍니다.',
    'shelter/banner/default_banner.png',
    now(), now()
),
(
    gen_random_uuid(),
    '들꽃마루 동물보호소',
    '강원도 춘천시 공지로 67',
    '별관 1층',
    '0332221199',
    '매일 09:00~17:00 (연중무휴)',
    '자연 속에서 운영되는 보호소로, 넓은 마당에서 동물들이 자유롭게 뛰놀 수 있는 환경을 제공합니다.',
    'shelter/banner/default_banner.png',
    now(), now()
),
(
    gen_random_uuid(),
    '온기나눔 보호센터',
    '울산광역시 남구 삼산로 90',
    '2층',
    '0526669900',
    '매주 월-토 10:00~18:00 (일요일 휴무)',
    '지역 동물병원과 협력하여 상시 의료 지원이 가능한 보호소로, 노령견과 지병이 있는 동물도 함께 돌봅니다.',
    'shelter/banner/default_banner.png',
    now(), now()
),
(
    gen_random_uuid(),
    '반짝이는 발 보호센터',
    '세종특별자치시 한누리대로 15',
    '4층 401호',
    '0447773322',
    '매주 화-일 10:00~18:00 (월요일 휴무)',
    '신도시 지역 특성에 맞춰 젊은 층 입양자를 위한 온라인 상담 서비스를 함께 제공하는 보호소입니다.',
    'shelter/banner/default_banner.png',
    now(), now()
),
(
    gen_random_uuid(),
    '따스한손길 유기동물센터',
    '전라북도 전주시 완산구 효자로 43',
    '1층',
    '0638884455',
    '매일 09:30~18:30 (연중무휴)',
    '전통시장 인근에 위치하여 지역 상인들과 함께 유기동물 보호 캠페인을 진행하는 보호소입니다.',
    'shelter/banner/default_banner.png',
    now(), now()
),
(
    gen_random_uuid(),
    '푸른바다 반려동물보호소',
    '경상남도 창원시 성산구 창이대로 120',
    '지하 1층, 지상 2층',
    '0559992233',
    '매주 수-월 10:00~19:00 (화요일 휴무)',
    '해안가 인근 대형 보호소로, 유기동물 뿐 아니라 유실동물 임시보호 서비스도 함께 운영합니다.',
    'shelter/banner/default_banner.png',
    now(), now()
),
(
    gen_random_uuid(),
    '보금자리 동물사랑협회',
    '충청북도 청주시 흥덕구 오송읍 오송생명2로 5',
    '3층',
    '0431116688',
    '매주 화-일 09:00~17:00 (월요일 휴무)',
    '생명과학단지 인근에 위치하여 지역 연구기관과 협력한 동물 복지 프로그램을 운영하는 보호소입니다.',
    'shelter/banner/default_banner.png',
    now(), now()
);