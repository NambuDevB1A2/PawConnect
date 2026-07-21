'use client';

import styles from "@/styles/auth/register.module.css"
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import InputPassword from "@/components/common/InputPassword";
import ProfileImageUploader from "@/components/uploader/ProfileImageUploader";
import Section from "@/components/common/Section";
import CheckBox from "@/components/common/CheckBox";

export default function RegisterUserForm() {
    return (
        <form className={styles.wrapper_section}>
            
            <Section className={styles.wrapper_info} titleText="내 정보 입력">

                <div className={styles.box_info}>
                    <div className={styles.box_uploader}>
                        <ProfileImageUploader labelText="프로필 이미지"/>
                    </div>

                    <div className={styles.box_input}>
                        <Input 
                            name="email"
                            labelText="이메일" helperText="이메일을 입력해주세요"/>
                        <InputPassword 
                            name="password"
                            labelText="비밀번호" helperText="비밀번호를 입력해주세요"/>
                        <InputPassword 
                            name="re_password"
                            labelText="비밀번호 확인" helperText="비밀번호를 다시 입력해주세요"/>
                        <Input 
                            name="nickname"
                            labelText="닉네임" helperText="이메일을 입력해주세요"/>
                        
                        <div className={styles.box_agreement}>
                            <CheckBox>
                                <Button variant="text" type="button">이용약관</Button>
                                &nbsp;및&nbsp;
                                <Button variant="text" type="button">개인정보 처리방침</Button>
                                에 동의합니다
                            </CheckBox>
                        </div>
                    </div>
                </div>

                <Button className={styles.btn_submit} type="submit">회원가입</Button>
            </Section>
        </form>
    );
}