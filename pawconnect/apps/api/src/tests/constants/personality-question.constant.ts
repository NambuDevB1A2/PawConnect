// pawTI 테스트 질문
export interface PersonalityQuestion {
    id: number;
    question: string;
    options: [
        {
            text: string;
            score: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
        }, {
            text: string;
            score: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
        },
    ];
}

export const PERSONALITY_QUESTIONS: PersonalityQuestion[] = [
    {
        id: 1,
        question: '산책 중 다른 반려인과 마주쳤을 때 나는?',
        options: [
            {
                text: '먼저 웃으며 말을 걸거나 인사한다.',
                score: 'E',
            },
            {
                text: '상대가 먼저 다가오면 자연스럽게 대화한다.',
                score: 'I',
            },
        ],
    },
    {
        id: 2,
        question: '주말에 시간이 생긴다면 어떤 하루를 보내고 싶나요?',
        options: [
            {
                text: '사람들과 함께 밖에서 활동하며 시간을 보낸다.',
                score: 'E',
            },
            {
                text: '집에서 조용히 쉬며 에너지를 충전한다.',
                score: 'I',
            },
        ],
    },

    {
        id: 3,
        question: '예상치 못한 문제가 생기면?',
        options: [
            {
                text: '일단 움직이며 해결 방법을 찾아본다.',
                score: 'E',
            },
            {
                text: '상황을 충분히 정리한 뒤 행동한다.',
                score: 'I',
            },
        ],
    },

    {
        id: 4,
        question: '하루를 보내고 나면 언제 가장 "재충전됐다"는 느낌이 드나요?',
        options: [
            {
                text: '사람들과 함께 시간을 보내고 나면 더 활력이 생긴다.',
                score: 'E',
            },
            {
                text: '혼자만의 시간을 보내고 나면 마음이 편안해진다.',
                score: 'I',
            },
        ],
    },

    {
        id: 5,
        question: '처음 가는 모임에 참석하게 된다면?',
        options: [
            {
                text: '먼저 주변 사람들에게 자연스럽게 말을 건다.',
                score: 'E',
            },
            {
                text: '분위기를 살피며 천천히 적응한다.',
                score: 'I',
            },
        ],
    },

    {
        id: 6,
        question: '반려동물을 입양할 때 가장 먼저 생각하는 것은?',
        options: [
            {
                text: '현재 내 생활과 잘 맞는지 살펴본다.',
                score: 'S',
            },
            {
                text: '앞으로 함께 만들어갈 모습을 상상한다.',
                score: 'N',
            },
        ],
    },

    {
        id: 7,
        question: '새로운 장소를 방문하면?',
        options: [
            {
                text: '눈에 보이는 것들을 하나씩 경험한다.',
                score: 'S',
            },
            {
                text: '그 공간의 분위기나 숨은 이야기에 더 관심이 간다.',
                score: 'N',
            },
        ],
    },

    {
        id: 8,
        question: '새로운 장난감을 보면?',
        options: [
            {
                text: '설명보다 직접 사용해본다.',
                score: 'S',
            },
            {
                text: '다른 방식으로도 활용할 수 있을지 떠올린다.',
                score: 'N',
            },
        ],
    },

    {
        id: 9,
        question: '반려동물과 함께 살게 된다면?',
        options: [
            {
                text: '규칙적인 생활 리듬을 함께 만드는 것이 중요하다.',
                score: 'S',
            },
            {
                text: '서로 자연스럽게 맞춰가는 과정이 더 중요하다.',
                score: 'N',
            },
        ],
    },

    {
        id: 10,
        question: '새로운 취미를 시작할 때 나는?',
        options: [
            {
                text: '기본적인 방법부터 차근차근 익힌다.',
                score: 'S',
            },
            {
                text: '나만의 방식으로 다양하게 시도해본다.',
                score: 'N',
            },
        ],
    },

    {
        id: 11,
        question: '반려동물이 실수를 했다면?',
        options: [
            {
                text: '왜 그런 행동을 했는지 원인을 먼저 생각한다.',
                score: 'T',
            },
            {
                text: '놀랐을 반려동물을 먼저 달래준다.',
                score: 'F',
            },
        ],
    },

    {
        id: 12,
        question: '친구가 고민을 털어놓으면?',
        options: [
            {
                text: '현실적으로 도움이 될 방법을 함께 찾는다.',
                score: 'T',
            },
            {
                text: '먼저 마음을 이해하고 공감해준다.',
                score: 'F',
            },
        ],
    },

    {
        id: 13,
        question: '중요한 결정을 앞두고 있다면?',
        options: [
            {
                text: '장단점을 비교하며 신중하게 판단한다.',
                score: 'T',
            },
            {
                text: '내 마음이 더 끌리는 쪽을 선택한다.',
                score: 'F',
            },
        ],
    },

    {
        id: 14,
        question: '누군가를 칭찬할 때?',
        options: [
            {
                text: '노력이나 성과를 구체적으로 이야기한다.',
                score: 'T',
            },
            {
                text: '함께 있어서 좋았던 감정을 표현한다.',
                score: 'F',
            },
        ],
    },

    {
        id: 15,
        question: '입양을 결정할 때 가장 중요한 것은?',
        options: [
            {
                text: '끝까지 책임질 수 있는 환경인지 확인한다.',
                score: 'T',
            },
            {
                text: '함께 행복하게 지낼 수 있다는 확신이 든다.',
                score: 'F',
            },
        ],
    },

    {
        id: 16,
        question: '해야 할 일이 생기면?',
        options: [
            {
                text: '미리 끝내두면 마음이 편하다.',
                score: 'J',
            },
            {
                text: '마감이 다가올수록 집중이 잘 된다.',
                score: 'P',
            },
        ],
    },

    {
        id: 17,
        question: '갑작스러운 일정 변경이 생기면?',
        options: [
            {
                text: '조금 당황하지만 계획을 다시 세운다.',
                score: 'J',
            },
            {
                text: '오히려 새로운 상황을 즐기는 편이다.',
                score: 'P',
            },
        ],
    },

    {
        id: 18,
        question: '여행을 떠나기 전 나는?',
        options: [
            {
                text: '필요한 준비물을 미리 꼼꼼히 챙긴다.',
                score: 'J',
            },
            {
                text: '빠뜨린 게 있어도 현지에서 해결하면 된다고 생각한다.',
                score: 'P',
            },
        ],
    },

    {
        id: 19,
        question: '해야 할 일이 여러 개 생겼을 때 나는?',
        options: [
            {
                text: '우선순위를 정해 하나씩 계획대로 처리한다.',
                score: 'J',
            },
            {
                text: '가장 하고 싶은 일부터 시작한다.',
                score: 'P',
            },
        ],
    },

    {
        id: 20,
        question: '새로운 취미를 시작한다면?',
        options: [
            {
                text: '준비물을 갖추고 계획을 세운 뒤 시작한다.',
                score: 'J',
            },
            {
                text: '흥미가 생기면 바로 시작해본다.',
                score: 'P',
            },
        ],
    },
];

