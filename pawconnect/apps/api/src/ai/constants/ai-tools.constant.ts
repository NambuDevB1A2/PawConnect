export const FIND_ANIMALS_TOOL = {
    type: 'function' as const,
    name: 'findAnimals',
    description: '보호동물 목록을 DB에서 검색합니다.',
    parameters: {
        type: 'object',
        properties: {
            keyword: {
                type: 'string',
                description: '조회할 동물의 이름 혹은 보호소의 이름',
            },
            speciesName: {
                type: 'string',
                enum: ['개', '고양이'],
                description: '조회할 동물의 종류 이름. 목록에 없으면 생략하세요.',
            },
            breedName: {
                type: 'string',
                enum: [
                    '믹스견', '말티즈', '푸들', '포메라니안', '진돗개', '시츄', '치와와',
                    '코카스파니엘', '웰시코기', '리트리버', '코리안숏헤어', '러시안블루',
                    '페르시안', '브리티시숏헤어', '먼치킨', '스코티시폴드',
                ],
                description: '조회할 동물의 품종 이름. 목록에 없으면 생략하세요.',
            },
            gender: {
                type: 'string',
                enum: ['MALE', 'FEMALE', 'UNKNOWN'],
                description: '조회할 동물의 성별',
            },
            isNeutered: { type: 'boolean', description: '조회할 동물의 중성화 여부' },
            ageFilter: { type: 'number', description: '조회할 동물의 나이 (개월 수)' },
            status: {
                type: 'string',
                enum: ['PROTECTED', 'AVAILABLE', 'ADOPTED', 'REUNITED', 'DECEASED', 'EUTHANIZED'],
                description: '조회할 동물의 상태',
            },
        },
        required: [],
    },
};