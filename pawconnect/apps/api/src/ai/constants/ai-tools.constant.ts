const TOOL_FIND_ANIMALS = 
    {
        type: 'function',
        function: {
            name: 'findAnimals',
            description: '보호동물 목록을 DB에서 검색합니다.',
            parameters: {
                type: 'object',
                properties: {
                    keyword: {
                        type: 'string',
                        description: '조회할 동물의 이름 혹은 보호소의 이름',
                    },
                    species: {
                        type: 'number',
                        description: '조회할 동물의 동물 번호 (_AnimalBreed__DB.json의 id)',
                    },
                    breed: {
                        type: 'number',
                        description: '조회할 동물의 품종 번호 (_AnimalBreed__DB.json의 id)',
                    },
                    gender: {
                        type: 'string',
                        description: '조회할 동물의 성별 (Enum.ts의 AnimalGender)'
                    },
                    isNeutered: {
                        type: 'boolean',
                        description: '조회할 동물의 중성화 여부'
                    },
                    ageFilter: {
                        type: 'number',
                        description: '조회할 동물의 나이 (개월 수)'
                    },
                    status: {
                        type: 'string',
                        description: '조회할 동물의 상태 (Enum.ts의 AnimalStatus)',
                    }
                },
                required: [],
            },
        },
    };

export const TOOLS = [
    TOOL_FIND_ANIMALS,
];
