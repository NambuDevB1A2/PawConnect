'use client'
import { PawtiResultData } from "@/types/pawti/pawti.type";
import Button from "@/components/common/Button";
import Typography from "../common/Typography";
import AnimalCard from "../paw/AnimalCard";
import { useRouter } from "next/navigation";
import styles from "@/styles/pawLab/pawTIResult.module.css"
import { useState } from "react";
import { AIPawtiResponse } from "@/types/ai/ai-pawti-type";
import { SubmitAIPawti } from "@/services/ai/ai-pawti.client";
import { formatAIResponseText } from "@/utils/text/format-ai-text";


interface PawtiResultProps {
    result: PawtiResultData;
}

// PawTI 결과 페이지
export default function PawtiResult({ result }: PawtiResultProps) {
    const router = useRouter();

    // AI pawti 분석
    const [showAI, setShowAI] = useState(false);
    // AI 결과보기전 로딩
    const [loading, setLoading] = useState(false);
    // AI 결과
    const [aiResult, setAiResult] =
        useState<AIPawtiResponse["data"] | null>(null);

    // AI분석 버튼 로직
    const handleAIAnalysis = async () => {
        // 결과가 있으면 결과창 보여주기
        if (aiResult) {
            setShowAI(true);
            return;
        }

        // try 하는 이유?? 무슨 예외처리인지?
        try {
            setLoading(true);

            // response 에 받은 결과 정보 넣기
            const response = await SubmitAIPawti({
                mbti: result.mbti,
                title: result.title,
                keywords: result.keywords,
                breed: result.breed
            });
            // 받은결과 셋
            setAiResult(response.data);
            setShowAI(true);
        } catch (error) {
            console.error(error);
            alert("AI 분석 생성에 실패했습니다")
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.resultContainer}>
            <div className={styles.pageHeader}>
                <Typography variant="title">PawTI 결과</Typography>

                <Typography variant="body1">
                    나와 잘 맞는 반려동물 성향을 확인해보세요</Typography>
            </div>

            <div className={styles.resultCard}>
                <div className={styles.resultIcon}>🐾
                </div>
                <Typography variant="title">{result.title}</Typography>

                <Typography variant="body1" className={styles.resultSub}>
                    당신과 가장 닮은 반려동물 성향입니다
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
                {/* <Typography variant="title">AI 분석</Typography> */}

                {/* TODO: 분석보기 버튼 AI호출 보여주기 */}
                {!showAI && (
                    <Button fullWidth variant="success" className={styles.aiButton}
                        onClick={handleAIAnalysis} disabled={loading}>
                        {loading ? "AI가 당신과 맞는 아이를 분석 중이에요..."
                            : "AI PawTI 리포트 보기"}</Button>
                )}

                {showAI && aiResult && (
                    <div className={styles.aiBox}>
                        <div className={styles.aiHeader}>
                            <Typography variant="title"
                                className={styles.aiReportTitle}>
                                {/* 🤖  */}
                                AI 분석 리포트 </Typography>

                            <Typography variant="body2">
                                PawTI 결과를 바탕으로 AI가 분석한 성향입니다.
                            </Typography>
                        </div>

                        <div className={styles.aiItem}>
                            <Typography variant="subtitle" className={styles.aiTitle}>
                                🐾 성향 분석
                            </Typography>
                            <Typography variant="body1" className={styles.aiText}>
                                {formatAIResponseText(aiResult.analysis)}
                            </Typography>
                        </div>

                        <div className={styles.aiItem}>
                            <Typography variant="subtitle" className={styles.aiTitle}>
                                ❤️ 추천 이유
                            </Typography>
                            <Typography variant="body1" className={styles.aiText}>
                                {formatAIResponseText(aiResult.recommendReason)}
                            </Typography>
                        </div>

                        <div className={styles.aiItem}>
                            <Typography variant="subtitle" className={styles.aiTitle}>
                                📌 입양 체크포인트
                            </Typography>

                            <Typography variant="body1" className={styles.aiText}>
                                {formatAIResponseText(aiResult.adoptionCheckPoint)}
                            </Typography>
                        </div>

                        <div className={styles.aiItem}>
                            <Typography variant="subtitle" className={styles.aiTitle}>
                                💬 AI 한마디
                            </Typography>

                            <Typography variant="body1" className={styles.aiText}>
                                {formatAIResponseText(aiResult.aiComment)}
                            </Typography>
                        </div>
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