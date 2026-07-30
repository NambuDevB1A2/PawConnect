'use client';

import { validateTitle } from "@/utils/pawlog/pawlog.validator";
import { useActionState, useContext, useEffect, useState } from "react";
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

interface EditPawLogFormProps {
    pawLog: PawLog;
}

const initialState: UpdatePawLogSate = { };

export default function EditPawLogForm({
    pawLog
}: EditPawLogFormProps) {
    const [state, formAction, isPending] = useActionState(
        UpdatePawLog.bind(null, pawLog.id), 
        initialState);
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const [clientErrors, setClientErrors] = useState<{
        title?: string;
        content?: string;
    }>({});
    
    // 실시간 타이핑 유효성 검사
    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setClientErrors((prev) => ({ ...prev, title: validateTitle(value) }));
    };
    
    // 성공 반환시 로그인 화면으로 이동
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
        return <NotFound/>
    }

    return (
        <form action={formAction} className={styles.wrapper_section}>

            <Section className={styles.wrapper_pawlog_new} titleText="내 PawLog 수정하기">
            
                <ImagesUploader 
                    name="imgPawLog"
                    labelText="게시글 이미지"
                    initialImageUrls={pawLog.images.map((img) => img.img)}
                    errorText={state.imgPawLogError}
                    />

                <div className={styles.box_pawlog_input}>
                        <Input 
                            name="title" defaultValue={pawLog.title}
                            labelText="제목*" 
                            helperText="제목을 입력해주세요(최대 50자)"
                            errorText={clientErrors.title ?? state.titleError}
                            onChange={handleTitle}
                            />
                        <TextArea 
                            name="content" defaultValue={pawLog.content}
                            labelText="내용" 
                            helperText="내용을 입력해주세요(최대 500자)"
                            maxLength={500}
                            />
                </div>

                <Button className={styles.btn_submit} type="submit" disabled={isPending}>
                    {isPending ? "수정 중..." : "수정하기"}
                </Button>
            </Section>

        </form>
    );
}