'use client';

import { Dispatch, SetStateAction, startTransition, useActionState, useContext, useEffect, useRef, useState } from "react";
import { GenerateAnimal } from "@/services/ai/ai-generate-animal.client";
import { GenerateAnimalState } from "@/types/paw/generate-animal.type";
import { CreateAnimalForm } from "@/types/paw/animal.type";
import { ModalContext } from "@/providers/ModalProvider";
import { formatAIResponseText } from "@/utils/text/format-ai-text";

const initialAiState: GenerateAnimalState = {};

// 동물 등록 폼 - AI 자동 소개글(초안) 생성
export function useAnimalAiGenerate(
    form: CreateAnimalForm,
    setForm: Dispatch<SetStateAction<CreateAnimalForm>>,
) {
    const [aiState, formAiAction, isAiPending] = useActionState(GenerateAnimal, initialAiState);
    const { openModal, closeModal } = useContext(ModalContext);

    const [clientErrors, setClientErrors] = useState<{
        images?: string;
    }>({});

    // 모달 미리보기용으로 생성했던 objectURL들 보관 (기존 이미지 URL은 여기 포함하지 않음 - revoke 대상 아님)
    const previewUrlsRef = useRef<string[]>([]);

    const revokePreviewUrls = () => {
        previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
        previewUrlsRef.current = [];
    };

    // AI 생성 확인
    const handleGenerateConfirm = () => {
        const newImageFiles = form.images.filter((file) => file.size > 0);
        const totalImageCount = newImageFiles.length + form.existingImages.length;

        if (totalImageCount === 0) {
            setClientErrors((prev) => ({ ...prev, images: "이미지를 한 장이상 업로드해주세요" }));
            return;
        }

        setClientErrors((prev) => ({ ...prev, images: undefined }));

        // 모달에서 보여줄 이미지 미리보기 URL 생성 (기존 이미지 + 새로 올린 이미지)
        revokePreviewUrls();
        const newImageUrls = newImageFiles.map((file) => URL.createObjectURL(file));
        previewUrlsRef.current = newImageUrls; // revoke 대상은 새로 만든 objectURL만

        openModal("confirmGenerate", {
            content: `${form.description}`,
            subContent: `${form.healthStatus}`,
            imageUrls: [...form.existingImages, ...newImageUrls],
            onConfirm: () => {
                revokePreviewUrls();

                const formData = new FormData();
                formData.append('description', form.description ?? '');
                formData.append('healthStatus', form.healthStatus ?? '');
                // if (form.speciesId) formData.append('species', String(form.speciesId));
                // if (form.breedId) formData.append('breed', String(form.breedId));
                newImageFiles.forEach((file) => formData.append('images', file));

                // onClick 콜백 체인(모달)에서 직접 호출하므로 startTransition으로 감싸야
                // isAiPending이 정상적으로 업데이트됨
                startTransition(() => {
                    formAiAction(formData);
                });
            },
        });
    };

    // AI 응답 결과를 폼 상태(소개말/종/품종)에 반영 + 알림
    useEffect(() => {
        if (!aiState.response) return;

        if (aiState.response?.success) {
            alert('AI 소개글 작성을 성공적으로 마쳤습니다');
            setForm((prev) => ({
                ...prev,
                description: aiState.response?.description
                    ? formatAIResponseText(aiState.response.description)
                    : prev.description,
                healthStatus: aiState.response?.healthStatus
                    ? formatAIResponseText(aiState.response.healthStatus)
                    : prev.healthStatus,
                speciesId: aiState.response?.species?.id ?? prev.speciesId,
                breedId: aiState.response?.breed?.id ?? prev.breedId,
            }));
        } else {
            alert('AI 소개글 작성 도중 오류가 발생했습니다');
        }
    }, [aiState, setForm]);

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
        aiState,
        isAiPending,
        clientErrors,
        handleGenerateConfirm,
    };
}
