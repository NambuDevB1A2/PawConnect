import CheckBox from "@/components/common/CheckBox";
import Input from "@/components/common/Input";
import Radio from "@/components/common/Radio";
import RadioGroup from "@/components/common/RadioGroup";
import Section from "@/components/common/Section";
import Select from "@/components/common/Select";
import TextArea from "@/components/common/TextArea";
import Typography from "@/components/common/Typography";
import styles from "@/styles/adopt/adoptNew.module.css";

interface AdoptFormReadOnlyProps {
    userName: string;
    phone: string;
    email: string;
    address: string;
    addressDetail: string;

    petExperience: string;
    petsDescription: string;
    petExperiencePeriod: string;

    residenceType: string;
    petAllowedStatus: string;
    familySize: string;
    youngChildStatus: string;
    isFamilyConsent: string;

    adoptionPurpose: string;
    isCanVaccinate: boolean;
    isCanProvideMedicalCare: boolean;
    isCanProvideExercise: boolean;
    isAcceptLifetimeResponsibility: boolean;
    additionalNotes: string;

    className?: string;
}

export default function AdoptFormReadOnly({
    userName,
    phone,
    email,
    address,
    addressDetail,

    petExperience,
    petsDescription,
    petExperiencePeriod,

    residenceType,
    petAllowedStatus,
    familySize,
    youngChildStatus,
    isFamilyConsent,

    adoptionPurpose,
    isCanVaccinate,
    isCanProvideMedicalCare,
    isCanProvideExercise,
    isAcceptLifetimeResponsibility,
    additionalNotes,

    className = "",
}: AdoptFormReadOnlyProps) {

    return (
        <div>
            <Section titleText="기본 정보 입력" className={className}>
                <Input 
                    disabled
                    defaultValue={userName}
                    labelText="이름*"
                    />
                <Input 
                    disabled
                    defaultValue={phone}
                    labelText="전화번호*"
                    />
                <Input 
                    disabled
                    defaultValue={email}
                    labelText="이메일*"
                    />
                <Input 
                    disabled
                    defaultValue={address}
                    labelText="주소*" 
                    />
                <Input 
                    disabled
                    defaultValue={addressDetail}
                    labelText="상세 주소" 
                    />
            </Section>

            <Section titleText="입양 기본 정보" className={className}>
                <div className={styles.box_radio_group}>
                    <Typography weight="bold" className={styles.typo_radio}>반려동물 양육 경험</Typography>
                    <RadioGroup defaultValue={petExperience}
                        className={styles.box_radio_list}>
                        <Radio disabled value="NONE" text="반려동물을 키운적이 없습니다."/>
                        <Radio disabled value="PAST" text="과거에 반려동물을 키운적이 있습니다."/>
                        <Radio disabled value="CURRENT" text="현재 반려동물을 키우고 있습니다."/>
                    </RadioGroup>
                </div>

                {petExperience !== "NONE" &&
                <div className={styles.box_radio_group}>
                <Typography weight="bold" className={styles.typo_radio}> </Typography>
                <TextArea
                    disabled
                    defaultValue={petsDescription}
                    maxLength={100}
                    />
                </div>}
                
                {petExperience !== "NONE" &&
                <Select 
                    disabled
                    labelText="반려동물 양육 기간"
                    labelPosition="left"
                    helperText="선택하세요"
                    defaultValue={petExperiencePeriod}
                    options={[
                        { label: "1년 미만", value: "LESS_THAN_1_YEAR" },
                        { label: "1~3년", value: "ONE_TO_THREE_YEARS" },
                        { label: "3~5년", value: "THREE_TO_FIVE_YEARS" },
                        { label: "5년 이상", value: "OVER_FIVE_YEARS" },
                    ]}
                />}
            </Section>
            
            <Section titleText="거주 환경" className={`${styles.box_row_section} ${className}`}>
                <div className={styles.box_row_div}>
                <Select 
                    disabled
                    labelText="거주 형태"
                    labelPosition="top"
                    helperText="선택하세요"
                    defaultValue={residenceType}
                    options={[
                        { label: "아파트", value: "APARTMENT" },
                        { label: "빌라", value: "VILLA" },
                        { label: "단독주택", value: "DETACHED_HOUSE" },
                        { label: "오피스텔", value: "OFFICETEL" },
                        { label: "기숙사", value: "DORMITORY" },
                    ]}
                />
                
                <Select 
                    disabled
                    labelText="가족 구성"
                    labelPosition="top"
                    helperText="선택하세요"
                    defaultValue={familySize}
                    options={[
                        { label: "1명", value: "ONE" },
                        { label: "2명", value: "TWO" },
                        { label: "3명", value: "THREE" },
                        { label: "4명 이상", value: "FOUR_OR_MORE" },
                    ]}
                />
                
                <Select 
                    disabled
                    labelText="가족 동의 여부"
                    labelPosition="top"
                    helperText="선택하세요"
                    defaultValue={isFamilyConsent}
                    options={[
                        { label: "예", value: "true" },
                        { label: "아니오", value: "false" },
                    ]}
                />
                </div>
                
                <div className={styles.box_row_div}>
                <Select 
                    disabled
                    labelText="반려동물 사육 가능 여부"
                    labelPosition="top"
                    helperText="선택하세요"
                    defaultValue={petAllowedStatus}
                    options={[
                        { label: "가능", value: "ALLOWED" },
                        { label: "불가능", value: "NOT_ALLOWED" },
                        { label: "확인 필요", value: "NEED_CONFIRMATION" },
                    ]}
                />
                
                <Select 
                    disabled
                    labelText="어린 아이 여부"
                    labelPosition="top"
                    helperText="선택하세요"
                    defaultValue={youngChildStatus}
                    options={[
                        { label: "없음", value: "NONE" },
                        { label: "7세 미만", value: "UNDER_SEVEN" },
                        { label: "7세 이상", value: "SEVEN_OR_OLDER" },
                    ]}
                />
                </div>
            </Section>
            
            <Section titleText="입양 계획" className={className}>
                <div className={styles.box_radio_group}>
                <Typography weight="bold" className={styles.typo_radio}>입양 목적</Typography>
                <TextArea
                    disabled
                    defaultValue={adoptionPurpose}
                    helperText="입양을 희망하는 이유를 작성해주세요"
                    maxLength={100}
                    />
                </div>

                <div className={styles.box_radio_group}>
                <Typography weight="bold" className={styles.typo_radio}> </Typography>
                    <div className={styles.box_radio_list}>
                        <CheckBox disabled text="예방 접종을 실시할 수 있습니다." defaultChecked={isCanVaccinate}/>
                        <CheckBox disabled text="질병 발생시 병원 치료를 받을 수 있습니다." defaultChecked={isCanProvideMedicalCare}/>
                        <CheckBox disabled text="규칙적인 산책 및 운동을 제공할 수 있습니다." defaultChecked={isCanProvideExercise}/>
                        <CheckBox disabled text="평생 책임감을 가지고 양육하겠습니다." defaultChecked={isAcceptLifetimeResponsibility}/>
                    </div>
                </div>
                
                <div className={styles.box_radio_group}>
                <Typography weight="bold" className={styles.typo_radio}>추가 전달사항</Typography>
                <TextArea
                    disabled
                    defaultValue={additionalNotes}
                    helperText="보호소에 전달하고 싶은 내용을 작성해주세요"
                    maxLength={500}
                    />
                </div>
            </Section>
        </div>
    );
}