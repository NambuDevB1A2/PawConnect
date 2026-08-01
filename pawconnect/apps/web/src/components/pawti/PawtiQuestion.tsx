import Typography from "../common/Typography";
import Button from "@/components/common/Button";
import PawtiProgress from "./PawtiProgress";


interface PawtiQuestionPorps {
    question:{
        question:string;
        options: { text: string;}[];
    };
    current: number;
    total: number;
    onAnsWer: (answer: number) => void;
}

export default function PawtiQuestion({question, current, total, onAnsWer} 
    : PawtiQuestionPorps){
    // 현재 질문
    //const question = PAWTI_QUESTIONS[current];

    return (
        <div>
             <Typography variant="heading">PawTI</Typography>

            {/* 진행 프로그래스바로 만들기 예)65%로 */}
            <div>
                {/* {current+1} / {PAWTI_QUESTIONS.length} */}
                {/* {current+1} / {total} */}
                <PawtiProgress current={current} total={total}/>
            </div>

            <div>
                <Typography variant="title">{question.question}</Typography>
            </div>

            <div>
                {question.options.map((option, index) => (
                    <Button key={index} onClick={()=> onAnsWer(index+1)}>
                        {option.text}
                    </Button>
                ))}
            </div>
        </div>
    );
}