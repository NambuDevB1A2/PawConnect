'use client';

import { CreatePawLog } from "@/services/pawlog/create-pawlog.client";
import { CreatePawLogSate } from "@/types/pawlog/create-pawlog.type";
import { useActionState, useEffect, useRef } from "react";
import styles from "@/styles/pawlog/newPawLog.module.css"
import Section from "@/components/common/Section";
import ImagesUploader from "@/components/uploader/ImagesUploader";
import Input from "@/components/common/Input";
import TextArea from "@/components/common/TextArea";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { usePawLogForm } from "@/hooks/form/usePawLogForm";

const initialState: CreatePawLogSate = {};

export default function NewPawLogForm() {
    const [state, formAction, isPending] = useActionState(CreatePawLog, initialState);

    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);

    const {
        title,
        content,
        clientErrors,
        aiState,
        isAiPending,
        handleTitleChange,
        handleContentChange,
        handleConfirm,
    } = usePawLogForm({
        formRef,
        initialTitle: state.title,
        initialContent: state.content,
    });

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
                            value={title}
                            labelText="제목*"
                            helperText="제목을 입력해주세요(최대 50자)"
                            errorText={clientErrors.title || state.titleError}
                            maxLength={50}
                            onChange={handleTitleChange}
                            />
                        <TextArea
                            name="content"
                            value={content}
                            labelText="내용"
                            helperText="AI 자동 게시글 생성시 전송할 내용 혹은 게시글로 작성할 내용을 입력해주세요(최대 500자)"
                            errorText={state.contentError || aiState.contentError}
                            maxLength={500}
                            onChange={handleContentChange}
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