
// 성향테스트에서 select -> animal select 중복 상수
export const animalSelect = {
    id: true,
    name: true,
    age: true,
    gender: true,
    imgThumbnail: true,

    shelter: { select: { name: true } },
    animalBreed: { select: { name: true } },

} as const;