import Typography from "../common/Typography";

// 결과전 로딩
export default function PawtiLoading() {
    return (
        <div>
            <Typography variant="heading">
                결과를 기다리고 있습니다...</Typography>
            
            <Typography variant="body1">
                잠시만 기다려 주세요...</Typography>
        </div>
    );
}