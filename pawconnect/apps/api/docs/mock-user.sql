
DELETE FROM "User";

-- 유저 1~10: role = USER (shelterId = NULL)
-- 유저 11~20: role = SHELTER (shelterId = 해당 보호소 UUID)
-- password: Aa123456789! (bcrypt, 10 rounds)

INSERT INTO "User" (
  id,
  "shelterId",
  email,
  password,
  nickname,
  role,
  "imgProfile",
  status,
  "createdAt",
  "updatedAt"
) VALUES
  ('00000000-0000-0000-0000-000000000001', NULL, 'user01@pawconnect.test', '$2b$10$HDXX6LAUkJ3GEBSOepmsIugMiGTV8akQUT1gxdyLYNN1WUswmNY5S', 'user01', 'USER', 'user/profile/default_profile.png', 'ACTIVE', now(), now()),
  ('00000000-0000-0000-0000-000000000002', NULL, 'user02@pawconnect.test', '$2b$10$HDXX6LAUkJ3GEBSOepmsIugMiGTV8akQUT1gxdyLYNN1WUswmNY5S', 'user02', 'USER', 'user/profile/default_profile.png', 'ACTIVE', now(), now()),
  ('00000000-0000-0000-0000-000000000003', NULL, 'user03@pawconnect.test', '$2b$10$HDXX6LAUkJ3GEBSOepmsIugMiGTV8akQUT1gxdyLYNN1WUswmNY5S', 'user03', 'USER', 'user/profile/default_profile.png', 'ACTIVE', now(), now()),
  ('00000000-0000-0000-0000-000000000004', NULL, 'user04@pawconnect.test', '$2b$10$HDXX6LAUkJ3GEBSOepmsIugMiGTV8akQUT1gxdyLYNN1WUswmNY5S', 'user04', 'USER', 'user/profile/default_profile.png', 'ACTIVE', now(), now()),
  ('00000000-0000-0000-0000-000000000005', NULL, 'user05@pawconnect.test', '$2b$10$HDXX6LAUkJ3GEBSOepmsIugMiGTV8akQUT1gxdyLYNN1WUswmNY5S', 'user05', 'USER', 'user/profile/default_profile.png', 'ACTIVE', now(), now()),
  ('00000000-0000-0000-0000-000000000006', NULL, 'user06@pawconnect.test', '$2b$10$HDXX6LAUkJ3GEBSOepmsIugMiGTV8akQUT1gxdyLYNN1WUswmNY5S', 'user06', 'USER', 'user/profile/default_profile.png', 'ACTIVE', now(), now()),
  ('00000000-0000-0000-0000-000000000007', NULL, 'user07@pawconnect.test', '$2b$10$HDXX6LAUkJ3GEBSOepmsIugMiGTV8akQUT1gxdyLYNN1WUswmNY5S', 'user07', 'USER', 'user/profile/default_profile.png', 'ACTIVE', now(), now()),
  ('00000000-0000-0000-0000-000000000008', NULL, 'user08@pawconnect.test', '$2b$10$HDXX6LAUkJ3GEBSOepmsIugMiGTV8akQUT1gxdyLYNN1WUswmNY5S', 'user08', 'USER', 'user/profile/default_profile.png', 'ACTIVE', now(), now()),
  ('00000000-0000-0000-0000-000000000009', NULL, 'user09@pawconnect.test', '$2b$10$HDXX6LAUkJ3GEBSOepmsIugMiGTV8akQUT1gxdyLYNN1WUswmNY5S', 'user09', 'USER', 'user/profile/default_profile.png', 'ACTIVE', now(), now()),
  ('00000000-0000-0000-0000-000000000010', NULL, 'user10@pawconnect.test', '$2b$10$HDXX6LAUkJ3GEBSOepmsIugMiGTV8akQUT1gxdyLYNN1WUswmNY5S', 'user10', 'USER', 'user/profile/default_profile.png', 'ACTIVE', now(), now()),
  ('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0001-000000000000', 'shelter01@pawconnect.test', '$2b$10$HDXX6LAUkJ3GEBSOepmsIugMiGTV8akQUT1gxdyLYNN1WUswmNY5S', 'shelter01', 'SHELTER', 'user/profile/default_profile.png', 'ACTIVE', now(), now()),
  ('00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0002-000000000000', 'shelter02@pawconnect.test', '$2b$10$HDXX6LAUkJ3GEBSOepmsIugMiGTV8akQUT1gxdyLYNN1WUswmNY5S', 'shelter02', 'SHELTER', 'user/profile/default_profile.png', 'ACTIVE', now(), now()),
  ('00000000-0000-0000-0000-000000000013', '00000000-0000-0000-0003-000000000000', 'shelter03@pawconnect.test', '$2b$10$HDXX6LAUkJ3GEBSOepmsIugMiGTV8akQUT1gxdyLYNN1WUswmNY5S', 'shelter03', 'SHELTER', 'user/profile/default_profile.png', 'ACTIVE', now(), now()),
  ('00000000-0000-0000-0000-000000000014', '00000000-0000-0000-0004-000000000000', 'shelter04@pawconnect.test', '$2b$10$HDXX6LAUkJ3GEBSOepmsIugMiGTV8akQUT1gxdyLYNN1WUswmNY5S', 'shelter04', 'SHELTER', 'user/profile/default_profile.png', 'ACTIVE', now(), now()),
  ('00000000-0000-0000-0000-000000000015', '00000000-0000-0000-0005-000000000000', 'shelter05@pawconnect.test', '$2b$10$HDXX6LAUkJ3GEBSOepmsIugMiGTV8akQUT1gxdyLYNN1WUswmNY5S', 'shelter05', 'SHELTER', 'user/profile/default_profile.png', 'ACTIVE', now(), now()),
  ('00000000-0000-0000-0000-000000000016', '00000000-0000-0000-0006-000000000000', 'shelter06@pawconnect.test', '$2b$10$HDXX6LAUkJ3GEBSOepmsIugMiGTV8akQUT1gxdyLYNN1WUswmNY5S', 'shelter06', 'SHELTER', 'user/profile/default_profile.png', 'ACTIVE', now(), now()),
  ('00000000-0000-0000-0000-000000000017', '00000000-0000-0000-0007-000000000000', 'shelter07@pawconnect.test', '$2b$10$HDXX6LAUkJ3GEBSOepmsIugMiGTV8akQUT1gxdyLYNN1WUswmNY5S', 'shelter07', 'SHELTER', 'user/profile/default_profile.png', 'ACTIVE', now(), now()),
  ('00000000-0000-0000-0000-000000000018', '00000000-0000-0000-0008-000000000000', 'shelter08@pawconnect.test', '$2b$10$HDXX6LAUkJ3GEBSOepmsIugMiGTV8akQUT1gxdyLYNN1WUswmNY5S', 'shelter08', 'SHELTER', 'user/profile/default_profile.png', 'ACTIVE', now(), now()),
  ('00000000-0000-0000-0000-000000000019', '00000000-0000-0000-0009-000000000000', 'shelter09@pawconnect.test', '$2b$10$HDXX6LAUkJ3GEBSOepmsIugMiGTV8akQUT1gxdyLYNN1WUswmNY5S', 'shelter09', 'SHELTER', 'user/profile/default_profile.png', 'ACTIVE', now(), now()),
  ('00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0010-000000000000', 'shelter10@pawconnect.test', '$2b$10$HDXX6LAUkJ3GEBSOepmsIugMiGTV8akQUT1gxdyLYNN1WUswmNY5S', 'shelter10', 'SHELTER', 'user/profile/default_profile.png', 'ACTIVE', now(), now());