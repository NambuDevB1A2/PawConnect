'use client';

import AdoptFormReadOnly from "@/components/adopt/AdoptFormReadOnly";
import AdoptStepProgress from "@/components/adopt/AdoptStepProgress";
import Button from "@/components/common/Button";
import CheckBox from "@/components/common/CheckBox";
import Input from "@/components/common/Input";
import NotFound from "@/components/common/NotFound";
import Radio from "@/components/common/Radio";
import RadioGroup from "@/components/common/RadioGroup";
import Section from "@/components/common/Section";
import Select from "@/components/common/Select";
import TextArea from "@/components/common/TextArea";
import Typography from "@/components/common/Typography";
import { TERMS_MESSAGES } from "@/constants/messages/Terms";
import { AuthContext } from "@/providers/AuthProvider";
import { ModalContext } from "@/providers/ModalProvider";
import { CreateAdoption } from "@/services/adopt/create-adoption.client";
import styles from "@/styles/adopt/adoptNew.module.css";
import { CreateAdoptionState } from "@/types/adopt/create-adoption.type";
import { AnimalDetail } from "@/types/paw/animal-detail.type";
import { validateShelterAddress, validateShelterPhone } from "@/utils/auth/auth.validator";
import { useRouter } from "next/navigation";
import { useActionState, useContext, useEffect, useRef, useState } from "react";

const initialState: CreateAdoptionState = { };

interface AdoptFormProps {
    animal: AnimalDetail;
}

export default function AdoptForm({ animal }: AdoptFormProps) {
    const [state, formAction, isPending] = useActionState(CreateAdoption.bind(null, animal.id), initialState);
    const [step, setStep] = useState(1);
    const isFirstRender = useRef(true);

    const [userName, setUserName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [addressDetail, setAddressDetail] = useState<string>("");

    const [petExperience, setPetExperience] = useState<string>("NONE");
    const [petsDescription, setPetsDescription] = useState<string>("");
    const [petExperiencePeriod, setPetExperiencePeriod] = useState<string>("");
    const [residenceType, setResidenceType] = useState<string>("");
    const [petAllowedStatus, setPetAllowedStatus] = useState<string>("");
    const [familySize, setFamilySize] = useState<string>("");
    const [youngChildStatus, setYoungChildStatus] = useState<string>("");
    const [isFamilyConsent, setIsFamilyConsent] = useState<string>("");

    const [adoptionPurpose, setAdoptionPurpose] = useState<string>("");
    const [isCanVaccinate, setIsCanVaccinate] = useState<boolean>(false);
    const [isCanProvideMedicalCare, setIsCanProvideMedicalCare] = useState<boolean>(false);
    const [isCanProvideExercise, setIsCanProvideExercise] = useState<boolean>(false);
    const [isAcceptLifetimeResponsibility, setIsAcceptLifetimeResponsibility] = useState<boolean>(false);
    const [additionalNotes, setAdditionalNotes] = useState<string>("");

    const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
    const [agreedToAdoption, setAgreedToAdoption] = useState<boolean>(false);
    
    const { user } = useContext(AuthContext);
    const { openModal } = useContext(ModalContext);

    const router = useRouter();

    const [clientErrors, setClientErrors] = useState<{
        userName?: string;
        phone?: string;
        email?: string;
        address?: string;
        addressDetail?: string;
    }>({});

    const handleShelterAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setClientErrors((prev) => ({ ...prev, address: validateShelterAddress(value) }));
        setAddress(value);
    };
    
    const handleShelterAddressDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setClientErrors((prev) => ({ ...prev, addressDetail: validateShelterAddress(value) }));
        setAddressDetail(value);
    };
    
    const handleShelterPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setClientErrors((prev) => ({ ...prev, phone: validateShelterPhone(value) }));
        setPhone(value);
    };
    
    // 이용약관, 개인정보 처리방침 모달
    const handleOpenTermsOfService = () => {
        openModal("contentViewer", { titleText: TERMS_MESSAGES.termsOfService.title, contentText: TERMS_MESSAGES.termsOfService.content });
    }

    const handleOpenPrivacyPolicy = () => {
        openModal("contentViewer", { titleText: TERMS_MESSAGES.privacyPolicy.title, contentText: TERMS_MESSAGES.privacyPolicy.content });
    }

    const handleCancel = () => {
        router.push(`/paw/${animal.id}`);
    };

    const handlePrevStep = () => {
        if (step <= 1) return;
        setStep((prev) => prev - 1);
    };

    const handleNextStep = () => {
        if (step >= 3) return;
        setStep((prev) => prev + 1);
    };

    // 다음 단계 비활성화 조건
    let isNextStepDisabled = true;

    if (step === 1) {
        isNextStepDisabled = (!userName || !phone || !email || !address);
    }
    else if (step === 2) {
        isNextStepDisabled = (!petExperience || !residenceType || !petAllowedStatus || !familySize
            || !youngChildStatus || !isFamilyConsent || !adoptionPurpose 
            // || !isCanVaccinate || !isCanProvideMedicalCare || !isCanProvideExercise || !isAcceptLifetimeResponsibility
            || !additionalNotes || !agreedToTerms || !agreedToAdoption
        );
    }

    // 단계 변경시 스크롤 효과
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [step]);

    // 성공 반환시 내 입양 신청 화면으로 이동
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        
        if (state.response?.success) {
            alert('입양 신청서 작성에 성공했습니다');
            router.push("/mypage/adopt");
        } else {
            alert('신청서 작성 도중 오류가 발생했습니다');

            if (state.userNameError || state.phoneError || state.emailError 
                || state.addressError || state.addressDetailError) {
                    setStep(1);
                }
                else {
                    setStep(2);
                }
        }
    }, [state]);
    

    if (!user) {
        return (
            <div className={styles.wrapper_form}>
                <NotFound/>
            </div>);
    }

    return (
        <div className={styles.wrapper_form}>
            <AdoptStepProgress step={step} />

            <form action={formAction}>

            <div style={{ display: step === 1 ? "block" : "none" }}>

                <Section titleText="기본 정보 입력">
                    <Input 
                        name="userName"
                        value={userName}
                        labelText="이름*"
                        helperText="이름을 입력해주세요"
                        errorText={clientErrors.userName ?? state.userNameError}
                        onChange={(e) => setUserName(e.target.value)}
                        />
                    <Input 
                        name="phone"
                        value={phone}
                        labelText="전화번호*"
                        helperText="전화번호를 입력해주세요(-없이 숫자만)"
                        errorText={clientErrors.phone ?? state.phoneError}
                        onChange={handleShelterPhone}
                        />
                    <Input 
                        name="email"
                        value={email}
                        labelText="이메일*"
                        helperText="이메일을 입력해주세요"
                        errorText={clientErrors.email ?? state.emailError}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    <Input 
                        name="address"
                        value={address}
                        labelText="주소*" 
                        helperText="주소를 입력해주세요"
                        errorText={clientErrors.address ?? state.addressError}
                        onChange={handleShelterAddress}
                        />
                    <Input 
                        name="addressDetail"
                        value={addressDetail}
                        labelText="상세 주소" 
                        helperText="상세 주소를 입력해주세요"
                        errorText={clientErrors.addressDetail ?? state.addressDetailError}
                        onChange={handleShelterAddressDetail}
                        />
                </Section>
            </div>

            <div style={{ display: step === 2 ? "block" : "none" }}>
                <Section titleText="입양 기본 정보">
                    <div className={styles.box_radio_group}>
                        <Typography weight="bold" className={styles.typo_radio}>반려동물 양육 경험*</Typography>
                        <RadioGroup name="petExperience" 
                            defaultValue={petExperience || "NONE"} onChange={setPetExperience}
                            className={styles.box_radio_list}>
                            <Radio value="NONE" text="반려동물을 키운적이 없습니다."/>
                            <Radio value="PAST" text="과거에 반려동물을 키운적이 있습니다."/>
                            <Radio value="CURRENT" text="현재 반려동물을 키우고 있습니다."/>
                        </RadioGroup>
                    </div>

                    {petExperience !== "NONE" &&
                    <div className={styles.box_radio_group}>
                    <Typography weight="bold" className={styles.typo_radio}> </Typography>
                    <TextArea
                        name="petsDescription"
                        value={petsDescription}
                        helperText="양육한 반려동물의 종류와 마릿수를 작성해주세요(개 2마리/고양이 1마리 등)"
                        maxLength={100}
                        onChange={(e) => setPetsDescription(e.target.value)}
                        />
                    </div>}
                    
                    {petExperience !== "NONE" &&
                    <Select 
                        name="petExperiencePeriod"
                        value={petExperiencePeriod}
                        labelText="반려동물 양육 기간"
                        labelPosition="left"
                        helperText="선택하세요"
                        options={[
                            { label: "1년 미만", value: "LESS_THAN_1_YEAR" },
                            { label: "1~3년", value: "ONE_TO_THREE_YEARS" },
                            { label: "3~5년", value: "THREE_TO_FIVE_YEARS" },
                            { label: "5년 이상", value: "OVER_FIVE_YEARS" },
                        ]}
                        onChange={setPetExperiencePeriod}
                    />}
                </Section>
                
                <Section titleText="거주 환경" className={styles.box_row_section}>
                    <div className={styles.box_row_div}>
                    <Select 
                        name="residenceType"
                        value={residenceType}
                        labelText="거주 형태*"
                        labelPosition="top"
                        helperText="선택하세요"
                        options={[
                            { label: "아파트", value: "APARTMENT" },
                            { label: "빌라", value: "VILLA" },
                            { label: "단독주택", value: "DETACHED_HOUSE" },
                            { label: "오피스텔", value: "OFFICETEL" },
                            { label: "기숙사", value: "DORMITORY" },
                        ]}
                        onChange={setResidenceType}
                    />
                    
                    <Select 
                        name="familySize"
                        value={familySize}
                        labelText="가족 구성*"
                        labelPosition="top"
                        helperText="선택하세요"
                        options={[
                            { label: "1명", value: "ONE" },
                            { label: "2명", value: "TWO" },
                            { label: "3명", value: "THREE" },
                            { label: "4명 이상", value: "FOUR_OR_MORE" },
                        ]}
                        onChange={setFamilySize}
                    />
                    
                    <Select 
                        name="isFamilyConsent"
                        value={isFamilyConsent}
                        labelText="가족 동의 여부*"
                        labelPosition="top"
                        helperText="선택하세요"
                        options={[
                            { label: "예", value: "true" },
                            { label: "아니오", value: "false" },
                        ]}
                        onChange={setIsFamilyConsent}
                    />
                    </div>
                    
                    <div className={styles.box_row_div}>
                    <Select 
                        name="petAllowedStatus"
                        value={petAllowedStatus}
                        labelText="반려동물 사육 가능 여부*"
                        labelPosition="top"
                        helperText="선택하세요"
                        options={[
                            { label: "가능", value: "ALLOWED" },
                            { label: "불가능", value: "NOT_ALLOWED" },
                            { label: "확인 필요", value: "NEED_CONFIRMATION" },
                        ]}
                        onChange={setPetAllowedStatus}
                    />
                    
                    <Select 
                        name="youngChildStatus"
                        value={youngChildStatus}
                        labelText="어린 아이 여부*"
                        labelPosition="top"
                        helperText="선택하세요"
                        options={[
                            { label: "없음", value: "NONE" },
                            { label: "7세 미만", value: "UNDER_SEVEN" },
                            { label: "7세 이상", value: "SEVEN_OR_OLDER" },
                        ]}
                        onChange={setYoungChildStatus}
                    />
                    </div>
                </Section>
                
                <Section titleText="입양 계획">
                    <div className={styles.box_radio_group}>
                    <Typography weight="bold" className={styles.typo_radio}>입양 목적*</Typography>
                    <TextArea
                        name="adoptionPurpose"
                        value={adoptionPurpose}
                        helperText="입양을 희망하는 이유를 작성해주세요"
                        maxLength={100}
                        onChange={(e) => setAdoptionPurpose(e.target.value)}
                        />
                    </div>

                    <div className={styles.box_radio_group}>
                    <Typography weight="bold" className={styles.typo_radio}> </Typography>
                        <div className={styles.box_radio_list}>
                            <CheckBox name="isCanVaccinate" text="예방 접종을 실시할 수 있습니다." 
                            checked={isCanVaccinate} 
                            onChange={(e) => setIsCanVaccinate(e.target.checked)}/>
                            <CheckBox name="isCanProvideMedicalCare" text="질병 발생시 병원 치료를 받을 수 있습니다." 
                            checked={isCanProvideMedicalCare}  
                            onChange={(e) => setIsCanProvideMedicalCare(e.target.checked)}/>
                            <CheckBox name="isCanProvideExercise" text="규칙적인 산책 및 운동을 제공할 수 있습니다."
                            checked={isCanProvideExercise} 
                            onChange={(e) => setIsCanProvideExercise(e.target.checked)}/>
                            <CheckBox name="isAcceptLifetimeResponsibility" text="평생 책임감을 가지고 양육하겠습니다."
                            checked={isAcceptLifetimeResponsibility} 
                            onChange={(e) => setIsAcceptLifetimeResponsibility(e.target.checked)}/>
                        </div>
                    </div>
                    
                    <div className={styles.box_radio_group}>
                    <Typography weight="bold" className={styles.typo_radio}>추가 전달사항*</Typography>
                    <TextArea
                        name="additionalNotes"
                        value={additionalNotes}
                        helperText="보호소에 전달하고 싶은 내용을 작성해주세요"
                        maxLength={500}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        />
                    </div>
                    
                    <div className={styles.box_radio_group}>
                        <Typography weight="bold" className={styles.typo_radio}> </Typography>
                            <div className={styles.box_radio_list}>
                            <CheckBox name="agreedToTerms"
                            onChange={(e) => setAgreedToTerms(e.target.checked)}>
                                <Button variant="text" type="button" onClick={handleOpenTermsOfService}>이용약관</Button>
                                &nbsp;및&nbsp;
                                <Button variant="text" type="button" onClick={handleOpenPrivacyPolicy}>개인정보 처리방침</Button>
                                에 동의합니다
                            </CheckBox>
                            
                            <CheckBox name="agreedToAdoption"
                            onChange={(e) => setAgreedToAdoption(e.target.checked)}>
                                입양 심사에 필요한 정보 제공에 동의합니다
                            </CheckBox>
                        </div>
                    </div>

                </Section>
                
            </div>
                
            {step === 3 &&
                <AdoptFormReadOnly
                    userName={userName}
                    phone={phone}
                    email={email}
                    address={address}
                    addressDetail={addressDetail}

                    petExperience={petExperience}
                    petsDescription={petsDescription}
                    petExperiencePeriod={petExperiencePeriod}

                    residenceType={residenceType}
                    petAllowedStatus={petAllowedStatus}
                    familySize={familySize}
                    youngChildStatus={youngChildStatus}
                    isFamilyConsent={isFamilyConsent}

                    adoptionPurpose={adoptionPurpose}
                    isCanVaccinate={isCanVaccinate}
                    isCanProvideMedicalCare={isCanProvideMedicalCare}
                    isCanProvideExercise={isCanProvideExercise}
                    isAcceptLifetimeResponsibility={isAcceptLifetimeResponsibility}
                    additionalNotes={additionalNotes}
                    />
            }
                    
                <div className={styles.box_btns}>
                    {step === 1 && 
                    <Button variant="modal" type="button" onClick={handleCancel} disabled={isPending}>취소</Button>}
                    {1 < step && step <= 3 && 
                    <Button variant="modal" type="button" onClick={handlePrevStep} disabled={isPending}>이전 단계</Button>}
                    {1 <= step && step < 3 && 
                    <Button variant="primary" type="button" onClick={handleNextStep} disabled={isPending || isNextStepDisabled}>다음 단계</Button>}
                    {step === 3 && 
                    <Button variant="primary" type="submit" disabled={isPending}>
                        {isPending ? "제출 중..." : "제출하기"}
                    </Button>}
                </div>
            
            </form>
            
        </div>
    );
}