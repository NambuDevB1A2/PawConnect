'use client';

import { CreatePawLog } from "@/services/pawlog/create-pawlog.client";
import { CreatePawLogSate } from "@/types/pawlog/create-pawlog.type";
import { validateTitle } from "@/utils/pawlog/pawlog.validator";
import { useActionState, useContext, useEffect, useRef, useState } from "react";
import styles from "@/styles/pawlog/newPawLog.module.css"
import Typography from "@/components/common/Typography";
import Section from "@/components/common/Section";
import ImagesUploader from "@/components/uploader/ImagesUploader";
import Input from "@/components/common/Input";
import TextArea from "@/components/common/TextArea";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { GeneratePawLog } from "@/services/ai/ai-generate-pawlog.client";
import { GeneratePawLogState } from "@/types/pawlog/gernerate-pawlog.type";
import { ModalContext } from "@/providers/ModalProvider";

const initialState: CreatePawLogSate = { };
const initialAiState: GeneratePawLogState = { };

export default function NewPawLogForm() {
    const [state, formAction, isPending] = useActionState(CreatePawLog, initialState);
    const [aiState, formAiAction, isAiPending] = useActionState(GeneratePawLog, initialAiState);

    const { openModal, closeModal } = useContext(ModalContext);

    const router = useRouter();

    const formRef = useRef<HTMLFormElement>(null);
    
    const previewUrlsRef = useRef<string[]>([]);

    const [clientErrors, setClientErrors] = useState<{
        title?: string;
        content?: string;
        imgPawLog?: string;
    }>({});
    
    // 실시간 타이핑 유효성 검사
    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setClientErrors((prev) => ({ ...prev, title: validateTitle(value) }));
    };

    // 이전에 생성해둔 미리보기 objectURL 정리
    const revokePreviewUrls = () => {
        previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
        previewUrlsRef.current = [];
    };

    // AI 작성 확인
    // AI 작성 확인
    const handleConfirm = () => {
        if (!formRef.current) return;

        // 현재 폼에 입력된 값을 FormData로 스냅샷
        const formData = new FormData(formRef.current);
        const content = (formData.get("content") as string) ?? "";
        const imageFiles = formData
            .getAll("imgPawLog")
            .filter((item): item is File => item instanceof File && item.size > 0);

        // AI 생성을 돌릴 최소 입력값 검증 (이미지 하나는 있어야 함)
        if (!content.trim() && imageFiles.length === 0) {
            alert("오류");
            setClientErrors({ imgPawLog: "이미지를 한 장이상 업로드해주세요" });
            return;
        }

        // 모달에서 보여줄 이미지 미리보기 URL 생성
        revokePreviewUrls();
        const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));
        previewUrlsRef.current = imageUrls;

        openModal("confirmGenerate", {
            content,
            imageUrls,
            onConfirm: () => {
                revokePreviewUrls();
                formAiAction(formData);
            },
        });
    };
    
    // 성공 반환시 상세 페이지로 이동
    useEffect(() => {
        if (!state.response) return;
        
        if (state.response?.success) {
            alert('게시글을 성공적으로 작성했습니다');
            router.push(`/pawlog/${state.response.pawLogId}`);
        } else {
            alert('게시 도중 오류가 발생했습니다');
        }
    }, [state]);

    // 성공시 alert 표시
    useEffect(() => {
        if (!aiState.response) return;
        
        if (aiState.response?.success) {
            alert('AI 게시글 작성을 성공적으로 마쳤습니다');
        } else {
            alert('AI 게시글 작성 도중 오류가 발생했습니다');
        }
    }, [aiState]);

    useEffect(() => {
        if (isAiPending) {
            openModal("aiGenerate");
        } else {
            closeModal();
        }
    }, [isAiPending]);

    // 컴포넌트 언마운트 시 남아있는 objectURL 정리
    useEffect(() => {
        return () => revokePreviewUrls();
    }, []);

    return (
        <form ref={formRef} className={styles.wrapper_section}>

            <Section className={styles.wrapper_pawlog_new} titleText="새로운 PawLog 게시하기">
            
                <ImagesUploader 
                    name="imgPawLog"
                    labelText="게시글 이미지"
                    errorText={clientErrors.imgPawLog || state.imgPawLogError || aiState.imgPawLogError}
                    />

                <div className={styles.box_pawlog_input}>
                        <Input 
                            name="title" 
                            defaultValue={aiState.response?.title || state.title}
                            labelText="제목*" 
                            helperText="제목을 입력해주세요(최대 50자)"
                            errorText={clientErrors.title || state.titleError || aiState.contentError}
                            onChange={handleTitle}
                            />
                        <TextArea 
                            name="content" 
                            defaultValue={aiState.response?.content || state.content}
                            labelText="내용" 
                            helperText="AI 자동 게시글 생성시 전송할 내용 혹은 게시글로 작성할 내용을 입력해주세요(최대 500자)"
                            maxLength={500}
                            />
                </div>

                <Button 
                    className={styles.btn_submit}
                    variant="secondary" 
                    type="button"
                    onClick={handleConfirm} 
                    disabled={isAiPending || isPending}>
                    {isAiPending ? "AI 분석 중..." : "AI 자동 게시글 생성하기"}
                </Button>

                <Button 
                    className={styles.btn_submit} 
                    type="submit" 
                    formAction={formAction} 
                    disabled={isAiPending || isPending}>
                    {isPending ? "게시 중..." : "게시하기"}
                </Button>
            </Section>

        </form>
    );
}