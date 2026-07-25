-- 테스트 용

-- 데이타 지우기(아이디는 다음으로 넘어감)
DELETE FROM "Shelter";
DELETE FROM "AnimalBreed";
DELETE FROM "AnimalSpecies";
DELETE FROM "Agreement";

-- 전부 삭제
TRUNCATE TABLE
"AnimalImage",
"AnimalDetail",
"Animal",
"AnimalBreed",
"AnimalSpecies",
"Agreement",
"Shelter"
RESTART IDENTITY CASCADE;

-- Agreement
INSERT INTO "Agreement"
("title","content")
VALUES
('개인정보 수집 및 이용 동의',''),
('입양 심사 정보 제공 동의','');

-- Species
INSERT INTO "AnimalSpecies" ("name")
VALUES
('개'),
('고양이');

INSERT INTO "AnimalSpecies"(id,name)
VALUES
(1,'개'),
(2,'고양이');


-- Breed
INSERT INTO "AnimalBreed"
("id", "species", "name")
VALUES
(1, 1, '믹스견'),
(2, 1, '말티즈'),
(3, 1, '푸들'),
(4, 1, '포메라니안'),
(5, 1, '진돗개'),
(6, 1, '시츄'),
(7, 1, '치와와'),
(8, 1, '코카스파니엘'),
(9, 1, '웰시코기'),
(10,1, '리트리버'),
(11,2, '코리안숏헤어'),
(12,2, '러시안블루'),
(13,2, '페르시안'),
(14,2, '브리티시숏헤어'),
(15,2, '먼치킨'),
(16,2, '스코티시폴드');

SELECT * FROM "Shelter";

-- Shelter
INSERT INTO "Shelter"
(
"id",
"name",
"address",
"addressDetail",
"phone",
"operatingHours",
"description",
"imgBanner"
)
VALUES
(
gen_random_uuid(),
'서울시립동물복지지원센터 마포센터',
'서울시 마포구 매봉산로 31',
'에스플렉스센터 지하 1층',
'0221242839',
'09:00~18:00',
'서울시립동물복지지원센터',
'seoul-banner.jpg'
);

-- Animal
INSERT INTO "Animal"
(
"shelterId",
"name",
"species",
"breed",
"gender",
"isNeutered",
"age",
"isEstimatedAge",
"animalStatus",
"weight",
"imgThumbnail",
"createdAt",
"updatedAt"
)
SELECT
s.id,
v.name,
v.species,
v.breed,
v.gender::"AnimalGender",
v.neutered,
v.age,
true,
'AVAILABLE'::"AnimalStatus",
v.weight,
v.thumbnail,
NOW(),
NOW()
FROM "Shelter" s
CROSS JOIN
(
VALUES
('봉지',1,1,'FEMALE',false,36,3.16,'bongji.jpg'),
('바둑',1,2,'MALE',false,4,4.30,'baduk.jpg'),
('경자',1,2,'FEMALE',true,60,5.25,'gyeongja.jpg')
)
AS v
(
name,
species,
breed,
gender,
neutered,
age,
weight,
thumbnail
)
LIMIT 3;

select * from "Animal";
SELECT COUNT(*) FROM "Animal";

SELECT
s.id,
v.name,
v.species,
v.breed,
v.gender::"AnimalGender",
v.neutered,
v.age,
true,
'AVAILABLE'::"AnimalStatus",
v.weight,
v.thumbnail,
NOW(),
NOW()
FROM "Shelter" s
CROSS JOIN
(
VALUES
('봉지',1,1,'FEMALE',false,36,3.16,'bongji.jpg'),
('바둑',1,2,'MALE',false,4,4.30,'baduk.jpg'),
('경자',1,2,'FEMALE',true,60,5.25,'gyeongja.jpg')
)
AS v
(
name,
species,
breed,
gender,
neutered,
age,
weight,
thumbnail
);


-- AnimalDetail
INSERT INTO "AnimalDetail"
(
"id",
"animalId",
"noticeStartDate",
"noticeEndDate",
"foundLocation",
"specialNotes",
"description",
"healthStatus",
"updatedAt"
)
VALUES
(
gen_random_uuid(),
1,
'2026-06-04',
'2026-07-04',
'서울 마포구',
'사람을 좋아함',
'애교 많고 사람을 잘 따르는 푸들입니다.',
'건강 양호',
NOW()
),
(
gen_random_uuid(),
2,
'2026-06-04',
'2026-07-04',
'서울 마포구',
'활발함',
'에너지 넘치는 어린 믹스견입니다.',
'중성화 예정',
NOW()
),
(
gen_random_uuid(),
3,
'2026-01-11',
'2026-02-11',
'서울 마포구',
'간질약 복용',
'차분하고 사람을 좋아하는 아이입니다.',
'특발성 간질 관리중',
NOW()
);

select * from "AnimalDetail";

-- AnimalImage
INSERT INTO "AnimalImage"
(
"id",
"animalId",
"img"
)
VALUES
(gen_random_uuid(),1,'bongji-1.jpg'),
(gen_random_uuid(),1,'bongji-2.jpg'),

(gen_random_uuid(),2,'baduk-1.jpg'),
(gen_random_uuid(),2,'baduk-2.jpg'),

(gen_random_uuid(),3,'gyeongja-1.jpg'),
(gen_random_uuid(),3,'gyeongja-2.jpg');
