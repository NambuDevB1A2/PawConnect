
DELETE FROM "User";
DELETE FROM "Shelter";
DELETE FROM "ShelterImage";

TRUNCATE TABLE
"User",
"Shelter"
"ShelterImage",
RESTART IDENTITY CASCADE;