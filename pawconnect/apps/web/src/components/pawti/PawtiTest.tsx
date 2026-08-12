'use client'
import { PAWTI_QUESTIONS } from "@/constants/pawti/pawti-question.constants";
import { SubmitPawti } from "@/services/pawti/pawti.client";
import { useState } from "react"
import PawtiQuestion from "./PawtiQuestion";
import PawtiLoading from "./PawtiLoading";
import PawtiIntro from "./PawtiIntro";
import { useRouter } from "next/navigation";


export default function PawTITest() {
    const router = useRouter();

    // 상태관리
    const [step, setStep] = useState<"intro" | "test">("intro");

    // 답변 state
    const [answers, setAnswers] = useState<number[]>([]);
    const [current, setCurrent] = useState(0);    

    // 현재 질문
    const question = PAWTI_QUESTIONS[current];

    // 테스트 실행
    const handleAnswer = async (answer: number) => {
        const newAnswers = [...answers, answer];

        setAnswers(newAnswers);

        // 마지막 문제
        if (current === PAWTI_QUESTIONS.length - 1) {
            await submitResult(newAnswers);
            return;
        }
        setCurrent(prev => prev + 1);
    }

    // 제출
    const [loading, setLoading] = useState(false);

    const submitResult = async (answers: number[]) => {
        try {
            setLoading(true);

            const data = await SubmitPawti({ answers });

            sessionStorage.setItem("pawti-result",JSON.stringify(data));

            router.push("/pawlab/pawti/result");

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

    return (
        <div>
            <PawtiQuestion question={question} current={current}
                total={PAWTI_QUESTIONS.length}
                onAnsWer={handleAnswer} />
        </div>
    )
} 