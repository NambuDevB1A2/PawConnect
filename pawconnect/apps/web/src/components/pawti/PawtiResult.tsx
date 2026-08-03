'use client'
import { PawtiResultData } from "@/types/pawti/pawti.type";
import Button from "@/components/common/Button";
import Typography from "../common/Typography";
import AnimalCard from "../paw/AnimalCard";
import { useRouter } from "next/navigation";
import styles from "@/styles/pawLab/pawTIResult.module.css"
import { useState } from "react";


interface PawtiResultProps {
    result: PawtiResultData;
}

// PawTI 결과 페이지
export default function PawtiResult({ result }: PawtiResultProps) {
    const router = useRouter();

    // AI pawti 분석
    const [showAI, setShowAI] = useState(false);

    return (
        <div className={styles.resultContainer}>
            <div className={styles.resultCard}>
                <div className={styles.resultIcon}>🐾
                </div>
                <Typography variant="title">{result.title}</Typography>

                <Typography variant="body1" className={styles.resultSub}>
                    당신과 가장 닮은 반려동물 성향입니다.
                </Typography>

                <div className={styles.keywordWrapper}>
                    {result.keywords.map((keyword) => (
                        <span
                            key={keyword}
                            className={styles.keyword}
                        >
                            #{keyword}
                        </span>
                    ))}
                </div>
            </div>

            <section className={styles.section}>
                <Typography variant="title">추천 보호동물</Typography>

                <div className={styles.animalGrid}>
                    <div>
                        <Typography variant="body1" className={styles.animalTitle}>
                            당신과 닮은 아이</Typography>

                        {result.representativeAnimal ? (
                            <AnimalCard animal={result.representativeAnimal} />
                        ) : (
                            <div className={styles.emptyCard}>
                                <Typography variant="body2">
                                    등록된 추천 동물이 없습니다.
                                </Typography>
                            </div>
                        )}
                    </div>

                    <div>
                        <Typography variant="body1" className={styles.animalTitle}>
                            당신과 잘 맞는 아이</Typography>

                        {result.matchedAnimal ? (
                            <AnimalCard
                                animal={result.matchedAnimal}
                            />
                        ) : (
                            <div className={styles.emptyCard}>
                                <Typography variant="body2">
                                    등록된 추천 동물이 없습니다.
                                </Typography>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <hr className={styles.divider} />

            <section className={styles.section}>
                <Typography variant="title">AI 분석</Typography>

                <Button fullWidth variant="primary" onClick={() => setShowAI(true)}>
                    AI 분석 보기</Button>

                {showAI && (
                    <div className={styles.aiBox}>
                        <Typography variant="body1">
                            AI 분석은 준비중입니다.
                        </Typography>
                    </div>
                )}
            </section>

            <div className={styles.buttonGroup}>
                <Button variant="outline" onClick={() => {
                    if (result.representativeAnimal) {
                        router.push(
                            `/paw?species=${result.representativeAnimal.speciesId}&breed=${result.representativeAnimal.breedId}`
                        )
                        // router.push(
                        //     `/paw?breed=${result.representativeAnimal.breedId}`
                        // )
                    } else {
                        router.push("/paw")
                    }
                }}> 다른 아이 더보기</Button>

                <Button variant="outline" onClick={() => {
                    sessionStorage.removeItem("pawti-result");
                    router.push("/pawlab/pawti/test");
                }}>
                    테스트 다시하기</Button>
                {/* <Button variant="outline" onClick={() =>
                    router.push("/pawlab/pawti")}>PawLab 가기</Button> */}
            </div>
        </div>
    );
}