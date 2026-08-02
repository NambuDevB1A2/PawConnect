
// 성향테스트에서 select -> animal select 중복 상수
export const animalSelect = {
    id: true,
    name: true,
    age: true,
    gender: true,
    imgThumbnail: true,

    shelter: { select: { name: true } },
    animalBreed: { select: { id: true, name: true } },
    animalSpecies: {select: {name: true}},

    shelterId: true,
    animalStatus: true,
    isNeutered: true,
    isEstimatedAge: true,
    weight: true,
    createdAt: true,

} as const;