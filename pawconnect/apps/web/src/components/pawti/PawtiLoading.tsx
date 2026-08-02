import Typography from "../common/Typography";
import styles from "@/styles/pawLab/pawTI.module.css";

// 결과전 로딩
export default function PawtiLoading() {
    return (
        <div className={styles.loadingContainer}>
            <Typography variant="heading">
                🐾 결과를 분석하고 있습니다...</Typography>

            <Typography variant="body1">
                잠시만 기다려 주세요</Typography>

            <div className={styles.loadingCircle} />
            <Typography variant="body1">
                당신과 닮은 친구를 찾는 중...</Typography>
        </div>
    );
}