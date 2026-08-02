import Typography from "../common/Typography";
import Button from "@/components/common/Button";
import PawtiProgress from "./PawtiProgress";
import styles from "@/styles/pawLab/pawTI.module.css";


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

    return (
        <div className={styles.questionContainer}>
            {/* 진행 프로그래스바 */}
                <PawtiProgress current={current} total={total}/>

                <Typography variant="title" className={styles.questionTitle}>
                    {question.question}</Typography>

            <div className={styles.answerWrapper}>
                {question.options.map((option, index) => (
                    <Button className={styles.answerButton} variant="outline"
                        key={index} onClick={()=> onAnsWer(index+1)} >
                        {option.text}
                    </Button>
                ))}
            </div>
        </div>
    );
}
