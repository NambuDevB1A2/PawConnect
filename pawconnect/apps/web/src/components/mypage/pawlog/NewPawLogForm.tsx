'use client';

import { CreatePawLog } from "@/services/pawlog/create-pawlog.client";
import { CreatePawLogSate } from "@/types/pawlog/create-pawlog.type";
import { validateTitle } from "@/utils/pawlog/pawlog.validator";
import { useActionState, useEffect, useState } from "react";
import styles from "@/styles/mypage/pawlog/newPawLog.module.css"
import Typography from "@/components/common/Typography";
import Section from "@/components/common/Section";
import ImagesUploader from "@/components/uploader/ImagesUploader";
import Input from "@/components/common/Input";
import TextArea from "@/components/common/TextArea";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";

const initialState: CreatePawLogSate = { };

export default function NewPawLogForm() {
    const [state, formAction, isPending] = useActionState(CreatePawLog, initialState);
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
        if (state.response?.success) {
            router.push(`/pawlog/${state.response.pawLogId}`);
            alert('게시글을 성공적으로 작성했습니다');
        }
    }, [state]);

    return (
        <form action={formAction} className={styles.wrapper_section}>

            <Section className={styles.wrapper_pawlog_new} titleText="새로운 PawLog 게시하기">
            
                <ImagesUploader 
                    name="imgPawLog"
                    labelText="게시글 이미지"
                    errorText={state.imgPawLogError}
                    />

                <div className={styles.box_pawlog_input}>
                        <Input 
                            name="title" defaultValue={state.title}
                            labelText="제목*" 
                            helperText="제목을 입력해주세요(최대 50자)"
                            errorText={clientErrors.title ?? state.titleError}
                            onChange={handleTitle}
                            />
                        <TextArea 
                            name="content" defaultValue={state.content}
                            labelText="내용" 
                            helperText="내용을 입력해주세요(최대 500자)"
                            maxLength={500}
                            />
                </div>

                <Typography className={styles.typo_info}>* 항목은 필수 입력 항목입니다</Typography>
                
                <Button className={styles.btn_submit} type="submit" disabled={isPending}>
                    {isPending ? "게시 중..." : "게시하기"}
                </Button>
            </Section>

        </form>
    );
}