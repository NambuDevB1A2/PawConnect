'use client';

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Section from "@/components/common/Section";
import Typography from "@/components/common/Typography";
import ProfileImageUploader from "@/components/uploader/ProfileImageUploader";
import { ModalContext } from "@/providers/ModalProvider";
import { UpdateUser } from "@/services/users/update-user.client";
import styles from "@/styles/mypage/info.module.css"
import { UpdateUserState } from "@/types/mypage/update-user.type";
import { User } from "@/types/auth/user.type";
import { validateNickname } from "@/utils/auth/auth.validator";
import { useRouter } from "next/navigation";
import { useActionState, useContext, useEffect, useState } from "react";

interface InfoFormProps {
    user?: User;
}

const initialState: UpdateUserState = { };

export default function InfoForm({
    user
}: InfoFormProps) {
    const [state, formAction, isPending] = useActionState(UpdateUser, initialState);
    const { openModal } = useContext(ModalContext);
    const router = useRouter();

    const handleChangePassword = () => {
        openModal("changePassword", undefined);
    }
    
    const [clientErrors, setClientErrors] = useState<{
        nickname?: string;
    }>({});
    
    // 실시간 타이핑 유효성 검사
    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setClientErrors((prev) => ({ ...prev, nickname: validateNickname(value) }));
    };
    
    useEffect(() => {
        if (!state.response) return;
        
        if (state.response?.success) {
            alert('정보 변경에 성공했습니다');
            router.refresh();
        } else {
            alert('정보 변경 도중 오류가 발생했습니다');
        }
    }, [state]);

    return (
        <Section className={styles.wrapper_info} titleText="내 정보 입력">
            <form action={formAction} className={styles.wrapper_form}>

                <div className={styles.box_info}>
                    <div className={styles.box_uploader}>
                        <ProfileImageUploader
                            name="imgProfile" 
                            labelText="프로필 이미지"
                            initialImageUrl={user?.imgProfile}
                            errorText={state.imgProfileError}
                            />
                    </div>

                    <div className={styles.box_input}>
                        <Input 
                            name="email" defaultValue={user?.email}
                            labelText="이메일"
                            disabled
                            />
                        <Input 
                            name="nickname" defaultValue={user?.nickname}
                            labelText="닉네임"
                            helperText="닉네임을 입력해주세요(공백 또는 특수문자 불가 2~16자)"
                            errorText={clientErrors.nickname ?? state.nicknameError}
                            onChange={handleNicknameChange}
                            />
                        <div className={styles.box_password}>
                            <Typography weight="bold">비밀번호</Typography>
                            <Button className={styles.btn_password} type="button" onClick={handleChangePassword}>변경하기</Button>
                        </div>
                    </div>
                </div>
                
                <Button className={styles.btn_save} type="submit" disabled={isPending}>
                    {isPending? " 저장 중..." : "저장하기"}
                </Button>
                    
            </form>
        </Section>
    );
}