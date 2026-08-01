import Typography from "../common/Typography";

interface PawtiProgressProps {
    current: number;
    total: number;
}

// 테스트 진행도 프로그래스바
export default function PawtiProgress({ current, total }: PawtiProgressProps) {
    const percent = ((current + 1) / total) * 100;
    const progressText = (total /100) * current*20;

    return (
        <div>
            <div style={{
                width: "30%",
                height: "8px",
                background: "#eee",
                borderRadius: "999px",
            }}>
                <div style={{
                    width: `${percent}%`,
                    height: "100%",
                    background: "#6AB04A",
                    borderRadius: "999px",
                    transition: "0.3s",
                }} />

            </div>
            <Typography>{current + 1} / {total}</Typography>
            {/* <Typography>{progressText} %</Typography> */}
        </div>
    );
}