
// include-> animal include 중복 상수
export const ADOPTION_ANIMAL_INCLUDE ={
    animal: {
          include: {
            shelter: { select: { name: true } },
            animalSpecies: { select: { name: true } },
            animalBreed: { select: { name: true } },
          }
        },
} as const;