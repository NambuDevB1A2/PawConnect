'use client';

import { startTransition, useActionState, useContext, useEffect, useRef, useState } from "react";
import { validateTitle } from "@/utils/pawlog/pawlog.validator";
import { GeneratePawLog } from "@/services/ai/ai-generate-pawlog.client";
import { GeneratePawLogState } from "@/types/pawlog/gernerate-pawlog.type";
import { ModalContext } from "@/providers/ModalProvider";
import { formatAIResponseText } from "@/utils/text/format-ai-text";

const initialAiState: GeneratePawLogState = {};

interface UsePawLogFormParams {
    formRef: React.RefObject<HTMLFormElement | null>;
    initialTitle?: string;
    initialContent?: string;
    initialImageUrls?: string[];
    imageFieldName?: string;
}

export function usePawLogForm({
    formRef,
    initialTitle = "",
    initialContent = "",
    initialImageUrls = [],
    imageFieldName = "imgPawLog",
}: UsePawLogFormParams) {
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);

    const [clientErrors, setClientErrors] = useState<{
        title?: string;
        imgPawLog?: string;
    }>({});

    const [aiState, formAiAction, isAiPending] = useActionState(GeneratePawLog, initialAiState);
    const { openModal, closeModal } = useContext(ModalContext);

    // 모달 미리보기용으로 생성했던 objectURL들 보관 (기존 이미지 URL은 여기 포함하지 않음 - revoke 대상 아님)
    const previewUrlsRef = useRef<string[]>([]);

    const revokePreviewUrls = () => {
        previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
        previewUrlsRef.current = [];
    };

    // 일반 타이핑 - 실시간 유효성 검사
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTitle(value);
        setClientErrors((prev) => ({ ...prev, title: validateTitle(value) }));
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    // AI 작성 확인
    const handleConfirm = () => {
        if (!formRef.current) return;

        // 현재 폼에 입력된 값을 FormData로 스냅샷
        const formData = new FormData(formRef.current);
        const currentContent = (formData.get("content") as string) ?? "";

        // 새로 업로드된 파일
        const newImageFiles = formData
            .getAll(imageFieldName)
            .filter((item): item is File => item instanceof File && item.size > 0);

        // 유지 중인 기존 이미지 - ImagesUploader의 hidden input(`${imageFieldName}Keeps`)에서 실시간 값을 읽음
        // (사용자가 방금 기존 이미지를 삭제했다면 여기 즉시 반영됨)
        const keepFieldRaw = formData.get(`${imageFieldName}Keeps`);
        const keepImageUrls = typeof keepFieldRaw === "string" && keepFieldRaw.length > 0
            ? keepFieldRaw.split(",")
            : initialImageUrls; // hidden input이 아직 없는 극히 예외적인 경우의 폴백

        const totalImageCount = newImageFiles.length + keepImageUrls.length;

        if (!currentContent.trim() && totalImageCount === 0) {
            setClientErrors((prev) => ({ ...prev, imgPawLog: "이미지를 한 장이상 업로드해주세요" }));
            return;
        }

        // 모달에서 보여줄 이미지 미리보기 URL 생성 (기존 이미지 + 새로 올린 이미지)
        revokePreviewUrls();
        const newImageUrls = newImageFiles.map((file) => URL.createObjectURL(file));
        previewUrlsRef.current = newImageUrls; // revoke 대상은 새로 만든 objectURL만

        openModal("confirmGenerate", {
            content: currentContent,
            imageUrls: [...keepImageUrls, ...newImageUrls],
            onConfirm: () => {
                revokePreviewUrls();
                // onClick 콜백 체인(모달)에서 직접 호출하므로 startTransition으로 감싸야
                // isAiPending이 정상적으로 업데이트됨
                startTransition(() => {
                    formAiAction(formData);
                });
            },
        });
    };

    // AI 응답 결과를 title/content에 반영 + 알림
    useEffect(() => {
        if (!aiState.response) return;

        if (aiState.response?.success) {
            alert('AI 게시글 작성을 성공적으로 마쳤습니다');
            if (aiState.response.title) setTitle(aiState.response.title);
            if (aiState.response.content) setContent(formatAIResponseText(aiState.response.content));
        } else {
            alert('AI 게시글 작성 도중 오류가 발생했습니다');
        }
    }, [aiState]);

    // AI 분석 중일 때 로딩 모달 표시
    useEffect(() => {
        if (isAiPending) {
            openModal("aiGenerate");
        } else {
            closeModal();
        }
    }, [isAiPending]);

    // 언마운트 시 남아있는 objectURL 정리
    useEffect(() => {
        return () => revokePreviewUrls();
    }, []);

    return {
        title,
        content,
        clientErrors,
        aiState,
        isAiPending,
        handleTitleChange,
        handleContentChange,
        handleConfirm,
    };
}