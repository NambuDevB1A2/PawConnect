'use client';

import NotFound from "@/components/common/NotFound";
import Section from "@/components/common/Section";
import { Shelter } from "@/types/shelter.type";
import styles from "@/styles/mypage/shelterInfo.module.css"
import Button from "@/components/common/Button";
import TextArea from "@/components/common/TextArea";
import Input from "@/components/common/Input";
import ImagesUploader from "@/components/uploader/ImagesUploader";
import BannerImageUploader from "@/components/uploader/BannerUploader";
import { useActionState, useEffect, useState } from "react";
import { UpdateShelter } from "@/services/shelters/update-shelter.client";
import { UpdateShelterState } from "@/types/mypage/update-shelter.type";
import { validateShelterAddress, validateShelterPhone } from "@/utils/auth/auth.validator";
import { useRouter } from "next/navigation";

interface ShelterFormProps {
    shelter?: Shelter;
}

const initialState: UpdateShelterState = { };

export default function ShelterForm({
    shelter
}: ShelterFormProps) {
    const [state, formAction, isPending] = useActionState(UpdateShelter, initialState);
    const router = useRouter();

    const [clientErrors, setClientErrors] = useState<{
        shelterName?: string;
        shelterAddress?: string;
        shelterAddressDetail?: string;
        shelterPhone?: string;
    }>({});
    
    // 실시간 타이핑 유효성 검사
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

    useEffect(() => {
        if (state.response?.success) {
            alert('정보 변경에 성공했습니다');
            router.refresh();
        }
    }, [state]);
    
    if (!shelter) {
        return <NotFound/>;
    }

    return (
        <Section className={styles.wrapper_shelter_info} titleText="보호소 정보 입력">
            <form action={formAction} className={styles.wrapper_form}>

                <BannerImageUploader 
                    name="imgBanner"
                    wrapperClassName={styles.wrapper_image_uploader}
                    labelText="배너 이미지"
                    initialImageUrl={shelter?.imgBanner}
                    errorText={state.imgBannerError}/>
                
                <ImagesUploader 
                    name="imgShelter"
                    wrapperClassName={styles.wrapper_image_uploader}
                    labelText="보호소 이미지"
                    initialImageUrls={shelter?.images?.map((img) => img.img)}
                    errorText={state.imgShelterError}
                    />

                <div className={styles.box_shelter_input}>
                        <Input 
                            name="name" defaultValue={shelter?.name}
                            labelText="보호소 이름"
                            disabled
                            />
                        <Input 
                            name="address" defaultValue={shelter?.address}
                            labelText="주소" 
                            helperText="주소를 입력해주세요"
                            errorText={clientErrors.shelterAddress ?? state.addressError}
                            onChange={handleShelterAddress}
                            />
                        <Input 
                            name="addressDetail" defaultValue={shelter?.addressDetail}
                            labelText="상세 주소" 
                            helperText="상세 주소를 입력해주세요"
                            errorText={clientErrors.shelterAddressDetail ?? state.addressDetailError}
                            onChange={handleShelterAddressDetail}
                            />
                        <Input 
                            name="phone" defaultValue={shelter?.phone}
                            labelText="전화번호" 
                            helperText="전화번호를 입력해주세요(-없이 숫자만)"
                            errorText={clientErrors.shelterPhone ?? state.phoneError}
                            onChange={handleShelterPhone}
                            />
                        <TextArea 
                            name="operatingHours" defaultValue={shelter?.operatingHours}
                            labelText="운영 시간"
                            helperText="보호소를 운영하는 시간과 요일을 입력해주세요(최대 100자)" 
                            maxLength={100}
                            />
                        <TextArea 
                            name="description" defaultValue={shelter?.description}
                            labelText="보호소 소개말" 
                            helperText="보호소를 소개하는 말을 입력해주세요(최대 500자)" 
                            maxLength={500}
                            />
                </div>

                <Button className={styles.btn_save} type="submit" disabled={isPending}>
                    {isPending ? "저장 중..." : "저장하기"}
                </Button>
                
            </form>
        </Section>
    );
}