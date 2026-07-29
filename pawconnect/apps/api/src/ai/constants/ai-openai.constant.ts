export const TOOLS = [
    {
        type: 'function',
        function: {
            name: 'getAnimals',
            description: '보호동물 목록을 DB에서 조회합니다.',
            parameters: {
                type: 'object',
                properties: {
                    // breed: {
                    //     type: 'string',
                    //     description: '조회할 동물 품종 (예: 진돗개, 코리안숏헤어)',
                    // },
                },
                required: [/*'breed'*/],
            },
        },
    },
];