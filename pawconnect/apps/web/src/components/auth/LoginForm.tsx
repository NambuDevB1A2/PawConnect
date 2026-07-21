'use client';

import styles from "@/styles/auth/login.module.css"
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import Typography from "@/components/common/Typography";
import InputPassword from "@/components/common/InputPassword";
import { useActionState } from "react";
import { Login } from "@/services/auth/login.server";
import { LoginState } from "@/types/auth/login.type";
import { useRouter } from "next/navigation";

const initialState: LoginState = { }; // useState를 사용할 수 없어서 전역 저장

export default function LoginForm() {
    const [state, formAction, isPending] = useActionState(Login, initialState); // Login에서 fetch
    const router = useRouter();

    return (
        // formData로 body 전송
        <form action={formAction} className={styles.wrapper_section}>
        
            <div className={styles.wrapper_section}>
                <Typography variant="title">로그인</Typography>

                <div className={styles.box_input}>
                    <Input 
                        // name="email" 로 form 값 설정
                        // defaultValue로 email값 유지
                        name="email" defaultValue={state.email}
                        labelText="이메일" helperText="이메일을 입력해주세요" errorText={state.emailError}/>
                    <InputPassword 
                        // name="password" 로 form 값 설정
                        name="password"
                        labelText="비밀번호" helperText="비밀번호를 입력해주세요" errorText={state.passwordError}/>
                </div>

                <div className={styles.box_login}>
                    <Button
                        // 버튼 타입을 submit으로 form 전송 버튼 설정 
                        fullWidth type="submit" disabled={isPending}>
                        {isPending ? "로그인 중..." : "로그인"}
                    </Button>
                </div>

                <div className={styles.box_register}>
                    <Typography>아직 계정이 없으신가요?</Typography>
                    <Button variant="text" type="button" onClick={() => router.push('/register')}>회원가입</Button>
                </div>
            </div>
            
        </form>
    );
}