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
import { useRouter } from "next/navigation";
import { useActionState, useContext, useEffect, useState } from "react";
import { validateNickname, validatePassword, validateRePassword, validateShelterAddress, validateShelterName, validateShelterPhone } from "@/utils/auth/auth.validator";
import { RegisterShelterState } from "@/types/auth/register.type";
import { RegisterShelter } from "@/services/auth/register-shelter.client";
import { TERMS_MESSAGES } from "@/constants/messages/Terms";
import { ModalContext } from "@/providers/ModalProvider";
import Typography from "@/components/common/Typography";

const initialState: RegisterShelterState = { };

export default function RegisterShelterForm() {
    const [state, formAction, isPending] = useActionState(RegisterShelter, initialState);
    const { openModal } = useContext(ModalContext);
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [clientErrors, setClientErrors] = useState<{
        password?: string;
        rePassword?: string;
        nickname?: string;
        shelterName?: string;
        shelterAddress?: string;
        shelterAddressDetail?: string;
        shelterPhone?: string;
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
    
    const handleShelterName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setClientErrors((prev) => ({ ...prev, shelterName: validateShelterName(value) }));
    };

    const handleShelterAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setClientErrors((prev) => ({ ...prev, shelterAddress: validateShelterAddress(value) }));
    };
    
    const handleShelterAddressDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setClientErrors((prev) => ({ ...prev, shelterAddressDetail: validateShelterAddress(value) }));
    };
    
    const handleShelterPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setClientErrors((prev) => ({ ...prev, shelterPhone: validateShelterPhone(value) }));
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
        if (state.response?.success) {
            router.push("/login");
            alert('회원가입에 성공했습니다');
        }
    }, [state]);

    return (
        <form action={formAction} className={styles.wrapper_section}>

            <Typography className={styles.typo_info}>* 항목은 필수 입력 항목입니다</Typography>
            
            <Section className={styles.wrapper_info} titleText="내 정보 입력">

                <div className={styles.box_info}>
                    <div className={styles.box_uploader}>
                        <ProfileImageUploader
                            name="imgProfile" labelText="프로필 이미지"/>
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

            </Section>

            <Section className={styles.wrapper_shelter_info} titleText="보호소 정보 입력">
                <BannerImageUploader 
                    name="imgBanner"
                    labelText="배너 이미지"
                    errorText={state.imgBannerError}/>
                
                <ImagesUploader 
                    name="imgShelter"
                    labelText="보호소 이미지"
                    errorText={state.imgShelterError}
                    />

                <div className={styles.box_shelter_input}>
                        <Input 
                            name="name" defaultValue={state.name}
                            labelText="보호소 이름*"
                            helperText="보호소 이름을 입력해주세요(최대 100자)"
                            errorText={clientErrors.shelterName ?? state.nameError}
                            onChange={handleShelterName}
                            />
                        <Input 
                            name="address" defaultValue={state.address}
                            labelText="주소*" 
                            helperText="주소를 입력해주세요"
                            errorText={clientErrors.shelterAddress ?? state.addressError}
                            onChange={handleShelterAddress}
                            />
                        <Input 
                            name="addressDetail" defaultValue={state.addressDetail}
                            labelText="상세 주소" 
                            helperText="상세 주소를 입력해주세요"
                            errorText={clientErrors.shelterAddressDetail ?? state.addressDetailError}
                            onChange={handleShelterAddressDetail}
                            />
                        <Input 
                            name="phone" defaultValue={state.phone}
                            labelText="전화번호*" 
                            helperText="전화번호를 입력해주세요(-없이 숫자만)"
                            errorText={clientErrors.shelterPhone ?? state.phoneError}
                            onChange={handleShelterPhone}
                            />
                        <TextArea 
                            name="operatingHours" defaultValue={state.operatingHours}
                            labelText="운영 시간"
                            helperText="보호소를 운영하는 시간과 요일을 입력해주세요(최대 100자)" 
                            maxLength={100}
                            />
                        <TextArea 
                            name="description" defaultValue={state.description}
                            labelText="보호소 소개말" 
                            helperText="보호소를 소개하는 말을 입력해주세요(최대 500자)" 
                            maxLength={500}
                            />
                </div>

                <div className={styles.box_agreement}>
                    <CheckBox name="agreedToTerms">
                        <Button variant="text" type="button" onClick={handleOpenTermsOfService}>이용약관</Button>
                        &nbsp;및&nbsp;
                        <Button variant="text" type="button" onClick={handleOpenPrivacyPolicy}>개인정보 처리방침</Button>
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