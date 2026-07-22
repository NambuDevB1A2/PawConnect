
// include-> animal include 중복 상수
export const adoptionAnimalInclude ={
    animal: {
          include: {
            shelter: { select: { name: true } },
            animalSpecies: { select: { name: true } },
            animalBreed: { select: { name: true } },
          }
        },
} as const;