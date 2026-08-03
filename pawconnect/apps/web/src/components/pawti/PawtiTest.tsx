import { PAWTI_QUESTIONS } from "@/constants/pawti/pawti-question.constants";
import { SubmitPawti } from "@/services/pawti/pawti.client";
import { PawtiResult } from "@/types/pawti/pawti.type";
import { useState } from "react"

interface PawTITestProps {
    question : string;
}

export default function PawTITest({ question }: PawTITestProps) {
    // 답변 state
    const [answers,setAnswers] = useState<number[]>([]);
    const [current,setCurrent] = useState(0);

    const handleAnswer = (answer:number) => {
        const newAnswers = [...answers, answer];

        setAnswers(newAnswers);

        if(current === PAWTI_QUESTIONS.length-1){
            submitResult(newAnswers);
            return;
        }
        setCurrent(prev => prev+1);
    }

    // 제출
    const [result,setResult] = useState<PawtiResult|null> (null);
    const [loading,setLoading] = useState(false);

    const submitResult = async(answers:number[]) => {
        try{
            setLoading(true);

            const data = await SubmitPawti({answers});

            setResult(data);

        }catch(error) {
            alert("테스트 결과 생성 실패")
        } finally {
            setLoading(false);
        }
    }
} 