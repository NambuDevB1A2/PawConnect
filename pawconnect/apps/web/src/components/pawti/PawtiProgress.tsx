import styles from "@/styles/pawLab/pawTI.module.css";

interface PawtiProgressProps {
    current: number;
    total: number;
}

// 테스트 진행도 프로그래스바
export default function PawtiProgress({ current, total }: PawtiProgressProps) {
    const percent = Math.round(((current + 1) / total) * 100);

    return (
        <div className={styles.progressWrapper}>
            <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: `${percent}%` }} />
                <span className={styles.progressText}>{percent}%</span>
            </div>            
        </div>
    );
}