'use client'

import Typography from "@/components/common/Typography";
import { useRouter } from "next/navigation";
import styles from "@/styles/pawLab/pawLab.module.css";
import Badge from "@/components/common/Badge";


// PawTI 소개/메인 페이지
export default function Page() {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <div className={styles.intro}>
                <Typography variant="heading">PawLab</Typography>

                <Typography variant="body1">
                    반려동물과 더 가까워질 수 있는
                    다양한 테스트를 준비했어요.
                </Typography>

                <Typography variant="caption">
                    성향 테스트부터
                    입양 궁합, 생활 스타일 분석까지
                    앞으로 더 많은 테스트가 추가될 예정입니다.
                </Typography>
            </div>

            <div className={styles.testList}>
                <div className={styles.testCard} onClick={() => router.push("/pawlab/pawti/test")}>
                    <div className={styles.testHeader}>
                        <Typography variant="subtitle"> PawTI </Typography>

                        <Badge variant="info">New</Badge>
                    </div>

                    <div className={styles.testBody}>
                        <Typography variant="body1">
                            나와 닮은 동물은 누구일까요?
                        </Typography>

                        <Typography variant="caption">
                            20개의 질문으로
                            나와 잘 맞는 보호동물을 추천해드립니다.
                        </Typography>
                    </div>
                    <div className={styles.testFooter}>
                        <Typography variant="subtitle" className={styles.arrow}> → </Typography>
                        {/* <Button variant="outline" size="small"
                            onClick={() => router.push("/pawlab/pawti/test")}>
                            테스트 시작</Button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}