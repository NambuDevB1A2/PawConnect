'use client';

import { useActionState, useContext, useEffect, useRef } from "react";
import styles from "@/styles/pawlog/newPawLog.module.css"
import Section from "@/components/common/Section";
import ImagesUploader from "@/components/uploader/ImagesUploader";
import Input from "@/components/common/Input";
import TextArea from "@/components/common/TextArea";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { UpdatePawLogSate } from "@/types/pawlog/update-pawlog.type";
import { UpdatePawLog } from "@/services/pawlog/update-pawlog.client";
import { PawLog } from "@/types/pawlog/pawlog.type";
import { AuthContext } from "@/providers/AuthProvider";
import NotFound from "@/components/common/NotFound";
import { usePawLogForm } from "@/hooks/form/usePawLogForm";

interface EditPawLogFormProps {
    pawLog: PawLog;
}

const initialState: UpdatePawLogSate = {};

export default function EditPawLogForm({
    pawLog
}: EditPawLogFormProps) {
    const [state, formAction, isPending] = useActionState(UpdatePawLog.bind(null, pawLog.id), initialState);

    const { user } = useContext(AuthContext);

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
    } = usePawLogForm({
        formRef,
        initialTitle: pawLog.title,
        initialContent: pawLog.content,
        initialImageUrls: pawLog.images.map((img) => img.img),
    });

    // 성공 반환시 상세 페이지로 이동
    useEffect(() => {
        if (!state.response) return;

        if (state.response?.success) {
            alert('게시글을 성공적으로 수정했습니다');
            router.push(`/pawlog/${state.response.pawLogId}`);
        } else {
            alert('게시 도중 오류가 발생했습니다');
        }
    }, [state]);

    if (pawLog.author.id !== user?.id) {
        return <NotFound />
    }

    return (
        <form ref={formRef} className={styles.wrapper_section}>

            <Section className={styles.wrapper_pawlog_new} titleText="내 PawLog 수정하기">

                <ImagesUploader
                    name="imgPawLog"
                    labelText="게시글 이미지"
                    initialImageUrls={pawLog.images.map((img) => img.img)}
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
                            helperText="게시글로 작성할 내용을 입력해주세요(최대 500자)"
                            errorText={state.contentError || aiState.contentError}
                            maxLength={500}
                            onChange={handleContentChange}
                            />
                </div>

                <Button
                    className={styles.btn_submit}
                    type="submit"
                    formAction={formAction}
                    disabled={isAiPending || isPending}>
                    {isPending ? "수정 중..." : "수정하기"}
                </Button>
            </Section>

        </form>
    );
}