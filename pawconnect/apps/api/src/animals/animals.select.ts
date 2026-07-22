//목록 조회 시 select

select: {
  id: true,
  name: true,
  gender: true,
  age: true,
  isEstimatedAge: true,
  isNeutered: true,
  weight: true,
  animalStatus: true,
  imgThumbnail: true,
  createdAt: true,

  shelter: {
    select: {
      name: true,
    },
  },

  animalSpecies: {
    select: {
      name: true,
    },
  },

  animalBreed: {
    select: {
      name: true,
    },
  },
}