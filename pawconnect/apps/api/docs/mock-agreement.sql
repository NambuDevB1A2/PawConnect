
-- 데이터 지우기
DELETE FROM "Agreement";
DELETE FROM "UserAgreement";
DELETE FROM "AdoptionAgreement";

INSERT INTO "Agreement"
("title", "content")
VALUES
('이용약관 동의', ''),
('개인정보 처리방침 동의', ''),
('입양 심사 정보 제공 동의', '');

SELECT setval('"Agreement_id_seq"', (SELECT MAX(id) FROM "Agreement"));