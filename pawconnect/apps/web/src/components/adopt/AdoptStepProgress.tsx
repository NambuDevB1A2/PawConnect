import Typography from "@/components/common/Typography";
import styles from "@/styles/adopt/AdoptStepProgress.module.css";

interface AdoptStepProgressProps {
    step: number;
}

export default function AdoptStepProgress({ step }: AdoptStepProgressProps) {
    return (
        <div className={styles.wrapper_step}>

            <div className={styles.box_step}>
                <Typography className={`${styles.typo_step} ${step === 1 ? styles.typo_step_active : ""}`}>
                    1</Typography>
                <Typography className={`${styles.typo_text} ${step === 1 ? styles.typo_text_active : ""}`}>
                    기본 정보 입력</Typography>
            </div>

            <div className={styles.line}/>
            
            <div className={styles.box_step}>
                <Typography className={`${styles.typo_step} ${step === 2 ? styles.typo_step_active : ""}`}>
                    2</Typography>
                <Typography className={`${styles.typo_text} ${step === 2 ? styles.typo_text_active : ""}`}>
                    입양 신청서 작성</Typography>
            </div>

            <div className={styles.line}/>
            
            <div className={styles.box_step}>
                <Typography className={`${styles.typo_step} ${step === 3 ? styles.typo_step_active : ""}`}>
                    3</Typography>
                <Typography className={`${styles.typo_text} ${step === 3 ? styles.typo_text_active : ""}`}>
                    확인 및 제출</Typography>
            </div>
            
        </div>
    );
}