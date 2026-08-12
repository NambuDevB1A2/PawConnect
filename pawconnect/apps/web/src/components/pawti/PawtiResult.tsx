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

    // AI 분석 결과 표시 여부
    const [showAI, setShowAI] = useState(false);
    // AI 분석 요청 중복 방지 및 로딩 상태
    const [loading, setLoading] = useState(false);
    // AI 분석 결과 저장
    const [aiResult, setAiResult] =
        useState<AIPawtiResponse["data"] | null>(null);

    // AI PawTI 분석 요청 및 결과 표시
    const handleAIAnalysis = async () => {
        // 요청 중이면 중복 호출 방지
        if(loading) return;

        // 이미 분석 결과가 있으면 재요청 없이 표시
        if (aiResult) {
            setShowAI(true);
            return;
        }
        
        setLoading(true);

        try {
            // PawTI 결과 데이터를 기반으로 AI 분석 요청
            const response = await SubmitAIPawti({
                mbti: result.mbti,
                title: result.title,
                keywords: result.keywords,
                breed: result.breed
            });

            // API 요청 실패 처리
            if(!response) {
                alert("AI 요청에 실패했습니다");
                return;
            }

            // AI 분석 결과 저장 및 화면 표시
            setAiResult(response.data);
            setShowAI(true);
        } finally {
            // 요청 종료 후 로딩 상태 해제
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
                {/* AI 분석 요청 전 버튼 표시 */}
                {!showAI && (
                    <Button fullWidth variant="secondary" className={styles.aiButton}
                        onClick={handleAIAnalysis} disabled={loading}>
                        {loading ? "AI가 당신과 맞는 아이를 분석 중이에요..."
                            : "AI PawTI 리포트 보기"}</Button>
                )}

                {/* AI 분석 결과 리포트 */}
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
                {/* 추천 동물 목록 이동 */}
                <Button variant="outline" onClick={() => {
                    if (result.representativeAnimal) {
                        router.push(
                            `/paw?species=${result.representativeAnimal.speciesId}&breed=${result.representativeAnimal.breedId}`
                        )                    } else {
                        router.push("/paw")
                    }
                }}> 다른 아이 더보기</Button>

                {/* PawTI 테스트 재시작 */}
                <Button variant="outline" onClick={() => {
                    sessionStorage.removeItem("pawti-result");
                    router.push("/pawlab/pawti/test");
                }}> 테스트 다시하기</Button>
            </div>
        </div>
    );
}