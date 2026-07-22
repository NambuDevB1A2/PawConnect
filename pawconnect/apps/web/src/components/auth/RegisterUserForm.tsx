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
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { validateNickname, validatePassword, validateRePassword } from "@/utils/auth/auth.validator";

const initialState: RegisterUserState = { };

export default function RegisterUserForm() {
    const [state, formAction, isPending] = useActionState(RegisterUser, initialState);
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [clientErrors, setClientErrors] = useState<{
        password?: string;
        rePassword?: string;
        nickname?: string;
    }>({});
    
    // 실시간 타이핑 유효성 검사
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

    // 성공 반환시 로그인 화면으로 이동
    useEffect(() => {
        if (state.response?.success) {
            router.push("/login");
            alert('회원가입에 성공했습니다');
        }
    }, [state]);

    return (
        <form action={formAction} className={styles.wrapper_section}>
            
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
                            errorText={state.emailError}
                            />
                        <InputPassword 
                            name="password"
                            labelText="비밀번호*"
                            helperText="비밀번호를 입력해주세요(영문 대소문자, 숫자, 특수문자 6~30자)"
                            errorText={clientErrors.password ?? state.passwordError}
                            onChange={handlePasswordChange}
                            />
                        <InputPassword 
                            name="rePassword"
                            labelText="비밀번호 확인*"
                            helperText="비밀번호를 다시 입력해주세요"
                            errorText={clientErrors.rePassword ?? state.rePasswordError}
                            onChange={handleRePasswordChange}
                            />
                        <Input 
                            name="nickname" defaultValue={state.nickname}
                            labelText="닉네임*"
                            helperText="닉네임을 입력해주세요(공백 또는 특수문자 불가 2~16자)"
                            errorText={clientErrors.nickname ?? state.nicknameError}
                            onChange={handleNicknameChange}
                            />
                    </div>
                </div>
                
                <div className={styles.box_agreement}>
                    <CheckBox name="agreedToTerms">
                        <Button variant="text" type="button">이용약관</Button>
                        &nbsp;및&nbsp;
                        <Button variant="text" type="button">개인정보 처리방침</Button>
                        에 동의합니다
                    </CheckBox>
                </div>

                <Button className={styles.btn_submit} type="submit">
                    {isPending ? "회원가입 중..." : "회원가입"}
                </Button>
            </Section>
        </form>
    );
}