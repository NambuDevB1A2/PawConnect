'use client';

import styles from "@/styles/auth/register.module.css"
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import InputPassword from "@/components/common/InputPassword";
import ProfileImageUploader from "@/components/uploader/ProfileImageUploader";
import Section from "@/components/common/Section";
import CheckBox from "@/components/common/CheckBox";
import BannerImageUploader from "@/components/uploader/BannerUploader";
import ImagesUploader from "@/components/uploader/ImagesUploader";
import TextArea from "@/components/common/TextArea";

export default function RegisterShelterForm() {
    return (
        <form className={styles.wrapper_section}>
            
            <Section className={styles.wrapper_info} titleText="내 정보 입력">

                <div className={styles.box_info}>
                    <div className={styles.box_uploader}>
                        <ProfileImageUploader 
                        name="imgProfile" labelText="프로필 이미지"/>
                    </div>

                    <div className={styles.box_input}>
                        <Input 
                            name="email" 
                            labelText="이메일" 
                            helperText="이메일을 입력해주세요"
                            />
                        <InputPassword 
                            name="password" 
                            labelText="비밀번호" 
                            helperText="비밀번호를 입력해주세요(영문 대소문자, 숫자, 특수문자 6~30자)"
                            />
                        <InputPassword 
                            name="re_password" 
                            labelText="비밀번호 확인" 
                            helperText="비밀번호를 다시 입력해주세요"
                            />
                        <Input 
                            name="nickname" 
                            labelText="닉네임" 
                            helperText="이메일을 입력해주세요(최대 16자, 공백 또는 특수문자 불가)"
                            />
                        
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

            </Section>

            <Section className={styles.wrapper_shelter_info} titleText="보호소 정보 입력">
                <BannerImageUploader 
                    name="imgBanner"
                    labelText="배너 이미지"/>
                
                <ImagesUploader labelText="보호소 이미지"/>

                <div className={styles.box_shelter_input}>
                        <Input name="name" labelText="보호소 이름" helperText="보호소 이름을 입력해주세요(최대 100자)"/>
                        <Input name="address" labelText="주소" helperText="주소를 입력해주세요"/>
                        <Input name="addressDetail" labelText="상세 주소" helperText="상세 주소를 입력해주세요"/>
                        <Input name="phone" labelText="전화번호" helperText="전화번호를 입력해주세요(-없이 숫자만)"/>
                        <TextArea labelText="운영 시간" helperText="보호소를 운영하는 시간과 요일을 입력해주세요(최대 100자)" maxLength={100}/>
                        <TextArea labelText="보호소 소개말" helperText="보호소를 소개하는 말을 입력해주세요(최대 500자)" maxLength={500}/>
                </div>

                <Button className={styles.btn_submit} type="submit">회원가입</Button>
            </Section>
        </form>
    );
}