'use client';

import styles from "@/styles/auth/register.module.css"
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import InputPassword from "@/components/common/InputPassword";
import ProfileImageUploader from "@/components/uploader/ProfileImageUploader";
import Section from "@/components/common/Section";
import CheckBox from "@/components/common/CheckBox";
import { RegisterUserState } from "@/types/auth/register.type";
import { RegisterUser } from "@/services/auth/register-user.client";
import { useActionState, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { validateEmail, validateNickname, validatePassword, validateRePassword } from "@/utils/auth/auth.validator";
import { ModalContext } from "@/providers/ModalProvider";
import { TERMS_MESSAGES } from "@/constants/messages/Terms";
import Typography from "@/components/common/Typography";

const initialState: RegisterUserState = { };

export default function RegisterUserForm() {
    const [state, formAction, isPending] = useActionState(RegisterUser, initialState);
    const { openModal } = useContext(ModalContext);
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [clientErrors, setClientErrors] = useState<{
        email?: string;
        password?: string;
        rePassword?: string;
        nickname?: string;
    }>({});
    
    // 실시간 타이핑 유효성 검사
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setClientErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        setClientErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    };

    const handleRePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setClientErrors((prev) => ({ ...prev, rePassword: validateRePassword(password, value) }));
    };

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setClientErrors((prev) => ({ ...prev, nickname: validateNickname(value) }));
    };

    // 이용약관, 개인정보 처리방침 모달
    const handleOpenTermsOfService = () => {
        openModal("contentViewer", { titleText: TERMS_MESSAGES.termsOfService.title, contentText: TERMS_MESSAGES.termsOfService.content });
    }

    const handleOpenPrivacyPolicy = () => {
        openModal("contentViewer", { titleText: TERMS_MESSAGES.privacyPolicy.title, contentText: TERMS_MESSAGES.privacyPolicy.content });
    }

    // 성공 반환시 로그인 화면으로 이동
    useEffect(() => {
        if (!state.response) return;
        
        if (state.response?.success) {
            alert('회원가입에 성공했습니다');
            router.push("/login");
        } else {
            alert('회원가입 도중 오류가 발생했습니다');
        }
    }, [state]);

    return (
        <form action={formAction} className={styles.wrapper_section}>
            
            <Typography className={styles.typo_info}>* 항목은 필수 입력 항목입니다</Typography>
            
            <Section className={styles.wrapper_info} titleText="내 정보 입력">

                <div className={styles.box_info}>
                    <div className={styles.box_uploader}>
                        <ProfileImageUploader
                            // name으로 파일 이름 지정
                            name="imgProfile" 
                            labelText="프로필 이미지"
                            errorText={state.imgProfileError}
                            />
                    </div>

                    <div className={styles.box_input}>
                        <Input 
                            name="email" defaultValue={state.email}
                            labelText="이메일*"
                            helperText="이메일을 입력해주세요"
                            errorText={clientErrors.email || state.emailError}
                            maxLength={255}
                            onChange={handleEmailChange}
                            />
                        <InputPassword 
                            name="password"
                            labelText="비밀번호*"
                            helperText="비밀번호를 입력해주세요(영문 대소문자, 숫자, 특수문자 6~30자)"
                            errorText={clientErrors.password || state.passwordError}
                            maxLength={255}
                            onChange={handlePasswordChange}
                            />
                        <InputPassword 
                            name="rePassword"
                            labelText="비밀번호 확인*"
                            helperText="비밀번호를 다시 입력해주세요"
                            errorText={clientErrors.rePassword || state.rePasswordError}
                            maxLength={255}
                            onChange={handleRePasswordChange}
                            />
                        <Input 
                            name="nickname" defaultValue={state.nickname}
                            labelText="닉네임*"
                            helperText="닉네임을 입력해주세요(공백 또는 특수문자 불가 2~16자)"
                            errorText={clientErrors.nickname || state.nicknameError}
                            maxLength={20}
                            onChange={handleNicknameChange}
                            />
                    </div>
                </div>
                
                <div className={styles.box_agreement}>
                    <CheckBox
                        name="agreedToTerms"
                        errorText={state.termsError}>
                        <Button variant="text" type="button" onClick={handleOpenTermsOfService}>이용약관</Button>
                        &nbsp;및&nbsp;
                        <Button variant="text" type="button" onClick={handleOpenPrivacyPolicy}>개인정보 처리방침</Button>
                        에 동의합니다
                    </CheckBox>
                </div>

                <Button className={styles.btn_submit} type="submit" disabled={isPending}>
                    {isPending ? "회원가입 중..." : "회원가입"}
                </Button>
            </Section>
        </form>
    );
}