// 보호동물 등록/수정 같이 사용할 폼
'use client'
import Button from "@/components/common/Button";
import BannerImageUploader from "@/components/uploader/BannerUploader";
import ImagesUploader from "@/components/uploader/ImagesUploader";
import { AnimalDetail } from "@/types/paw/animal-detail.type";
import Input from "@/components/common/Input";
import { useAnimalForm } from "@/hooks/useAnimalFrom";
import Select from "@/components/common/Select";
import CheckBox from "@/components/common/CheckBox";
import Section from "@/components/common/Section";
import styles from "@/styles/mypage/shelter/animalForm.module.css"
import TextArea from "@/components/common/TextArea";
import { validateAnimalForm } from "./ValidateAnimalForm";
import { useState } from "react";
import Typography from "@/components/common/Typography";


interface AnimalFormProps {
    mode: "create" | "edit";
    animal?: AnimalDetail;
}

// 화면(UI)만 담당
// Input 값 변경, Upload 컴포넌트 연결, 버튼 클릭, 동물 등록/수정 폼 (UI)
export default function AnimalForm({ mode, animal }: AnimalFormProps) {
    const { form, setForm, breedOptions, genderOptions, statusOptions,
        handleChange, handleSelectChange, handleCheckboxChange,
        handleTextareaChange, handleThumbnailChange, handleImagesChange,
        handleGenderChange, handleSubmit, isPending } = useAnimalForm(mode, animal);

    const [errors, setErrors] = useState({
        nameError: "",
        speciesError: "",
        breedError: "",
        ageError: "",
        weightError: "",
        foundLocationError: "",
        specialNotesError: "",
        descriptionError: "",
        healthStatusError: "",
    });

    // 제한 검증
    const handleSubmitAnimal = () => {
        const validationErrors = validateAnimalForm(form);

        // 에러 하나라도 있으면 중단
        if (
            Object.values(validationErrors).some(error => error !== "")
        ) {
            setErrors(validationErrors);
            return;
        }
        // 제출 진행
        handleSubmit();
    }


    return (
        <Section className={styles.wrapper_shelter_info} titleText="동물 정보 입력">
            <form className={styles.wrapper_form} onSubmit={(e) => {
                e.preventDefault();
                handleSubmitAnimal();
            }}>
                <BannerImageUploader
                    name="imgThumbnail"
                    wrapperClassName={styles.wrapper_image_uploader}
                    labelText="썸네일*"
                    initialImageUrl={animal?.imgThumbnail}
                    onChange={handleThumbnailChange}
                />

                <ImagesUploader
                    name="images"
                    wrapperClassName={styles.wrapper_image_uploader}
                    labelText="보호동물 사진*"
                    initialImageUrls={animal?.images}
                    onChange={handleImagesChange}
                />

                    <Input name="name" value={form.name} labelText="보호동물 이름*"
                        maxLength={20} onChange={handleChange} errorText={errors.nameError} />

                    <Select labelText="동물*" labelPosition="left"
                        labelSize="small"
                        helperText="동물을 선택하세요"
                        value={String(form.speciesId)}
                        options={[
                            { label: "개", value: "1" },
                            { label: "고양이", value: "2" }
                        ]}
                        onChange={(value) => {
                            handleSelectChange("speciesId", Number(value));
                            handleSelectChange("breedId", 0); // 종 바뀌면 품종 초기화
                        }}
                    />
                    {errors.speciesError && (
                        <Typography className={styles.error}>
                            {errors.speciesError}
                        </Typography>
                    )}

                    <Select labelText="품종*"
                        helperText={errors.breedError || "품종을 선택하세요"}
                        labelSize="small"
                        labelPosition="left"
                        value={String(form.breedId)}
                        options={breedOptions}
                        onChange={(value) =>
                            handleSelectChange("breedId", Number(value))}
                    />
                    {errors.breedError && (
                        <Typography className={styles.error}>
                            {errors.breedError}
                        </Typography>
                    )}

                    <Select labelText="성별*"
                        helperText="성별을 선택하세요"
                        labelSize="small"
                        labelPosition="left"
                        value={`${form.gender}_${form.isNeutered ? "TRUE" : "FALSE"}`}
                        options={genderOptions}
                        onChange={handleGenderChange}
                    />

                    <div className={styles.age_box}>
                        <Input
                            name="age"
                            labelText="나이*"
                            type="number"
                            value={String(form.age)}
                            errorText={errors.ageError}
                            onChange={handleChange}
                        />
                        <label className={styles.estimated}>
                            <CheckBox type="checkbox" name="추정"
                                checked={form.isEstimatedAge}
                                onChange={(e) => handleCheckboxChange(
                                    "isEstimatedAge", e.target.checked)}
                            />추정
                        </label>                        
                    </div>



                    <Input
                        name="weight"
                        labelText="몸무게(kg)*"
                        type="number"
                        value={String(form.weight)}
                        errorText={errors.weightError}
                        onChange={handleChange}
                    />
                    <Input
                        name="noticeStartDate"
                        type="date"
                        labelText="공고 시작일*"
                        value={form.noticeStartDate}
                        onChange={handleChange}
                    />

                    <Input
                        name="noticeEndDate"
                        type="date"
                        labelText="공고 종료일*"
                        value={form.noticeEndDate}
                        onChange={handleChange}
                    />
                    <Select
                        labelText="동물상태*" helperText="상태를 선택하세요"
                        labelSize="small"
                        labelPosition="left"
                        value={form.animalStatus}
                        options={statusOptions}
                        onChange={(value) =>
                            handleSelectChange("animalStatus", value)
                        }
                    />

                    <Input
                        name="foundLocation"
                        labelText="발견장소"
                        value={form.foundLocation}
                        errorText={errors.foundLocationError}
                        onChange={handleChange}
                    />
                    <TextArea
                        name="specialNotes"
                        labelText="특이사항"
                        maxLength={100}
                        defaultValue={form.specialNotes}
                        onChange={handleTextareaChange}
                    />
                    <TextArea
                        name="description"
                        labelText="소개말"
                        maxLength={500}
                        defaultValue={form.description}
                        onChange={handleTextareaChange}
                    />

                    <TextArea
                        name="healthStatus"
                        labelText="건강상태"
                        maxLength={500}
                        defaultValue={form.healthStatus}
                        onChange={handleTextareaChange}
                    />

                {/* 등록/수정 버튼 */}
                <Button className={styles.btn_submit} type="submit" disabled={isPending}>
                    {mode === "create" ? "등록하기" : "수정하기"}</Button>

            </form>
        </Section>
    );
}