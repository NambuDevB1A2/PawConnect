import Button from "@/components/common/Button";
import Typography from "../common/Typography";
import styles from "@/styles/pawLab/pawTI.module.css";


interface PawtiIntroProps {
    onStart: () => void;
}

// 인트로
export default function PawtiIntro({ onStart }: PawtiIntroProps) {
    return (
        <div className={styles.introContainer}>
            <div className={styles.introCard}>
                <div className={styles.introIcon}>🐶
                </div>
                <Typography variant="heading" className={styles.introTitle}>
                    PawTI </Typography>

                <Typography variant="body1" className={styles.introDescription}>
                    당신과 가장  닮은 동물 성향을 분석하고 <br></br>
                    잘 맞는 보호동물을 추천해드립니다 </Typography>

                <div className={styles.introInfo}>
                    <div className={styles.infoItem}>
                        ⏱ 예상 소요시간 3분
                    </div>
                    <div className={styles.infoItem}>
                        🐾 결과 즉시 확인
                    </div>

                    <div className={styles.infoItem}>
                        ❤️ 보호동물 추천 제공
                    </div>                    
                </div>

                 <Button className={styles.startButton} variant="primary"
                    onClick={onStart}>START</Button>

                <Typography variant="caption" className={styles.marketing}>
                    ⭐ 10만명이 선택한 PawTI</Typography>
            </div>
        </div>
    );
}