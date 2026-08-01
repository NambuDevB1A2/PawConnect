'use client'
import { PAWTI_QUESTIONS } from "@/constants/pawti/pawti-question.constants";
import { SubmitPawti } from "@/services/pawti/pawti.client";
import { PawtiResultData } from "@/types/pawti/pawti.type";
import { useState } from "react"
import Typography from "../common/Typography";
import Button from "../common/Button";
import PawtiQuestion from "./PawtiQuestion";
import PawtiResult from "./PawtiResult";
import PawtiLoading from "./PawtiLoading";
import PawtiIntro from "./PawtiIntro";

interface PawTITestProps {
}

// export function PawTIStatusUI(){
//     if(step ==="intro") return <PawtiIntro/>

//     if(step==="test")
//         return <PawtiQuestion/>

//     if(loading)
//         return <PawtiLoading/>

//     return <PawtiResult/>
// }


export default function PawTITest() {
    // 상태관리
    const [step, setStep] = useState<"intro" | "test">("intro");

    // 답변 state
    const [answers, setAnswers] = useState<number[]>([]);
    const [current, setCurrent] = useState(0);

    // 현재 질문
    const question = PAWTI_QUESTIONS[current];

    const handleAnswer = (answer: number) => {
        const newAnswers = [...answers, answer];

        setAnswers(newAnswers);

        // 마지막 문제
        if (current === PAWTI_QUESTIONS.length - 1) {
            submitResult(newAnswers);
            return;
        }
        setCurrent(prev => prev + 1);
    }

    // 제출
    const [result, setResult] = useState<PawtiResultData | null>(null);
    const [loading, setLoading] = useState(false);

    const submitResult = async (answers: number[]) => {
        try {
            setLoading(true);

            const data = await SubmitPawti({ answers });

            setResult(data);

        } catch (error) {
            alert("테스트 결과 생성 실패")
        } finally {
            setLoading(false);
        }
    }

    // 상태
    if (step == "intro")
        return (
            <PawtiIntro onStart={() => setStep("test")} />
        );

    // 로딩중일때
    if (loading)
        return <PawtiLoading />
    if (result)
        return <PawtiResult result={result} />

    return (
        <div>
            <PawtiQuestion question={question} current={current}
                total={PAWTI_QUESTIONS.length}
                onAnsWer={handleAnswer} />
        </div>
    )
} 