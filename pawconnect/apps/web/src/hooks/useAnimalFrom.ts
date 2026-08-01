// 보호동물 등록/ 수정 공용
'use client'
import { DOG_BREEDS, CAT_BREEDS, GENDER_OPTIONS, STATUS_OPTIONS, } from "@/constants/animal-filter.constants";
import { CreateAnimal } from "@/services/paw/create-animal.client"
import { updateAnimal } from "@/services/paw/update-animal.client";
import { AnimalDetail } from "@/types/paw/animal-detail.type";
import { CreateAnimalForm } from "@/types/paw/animal.type";
import { ApiError } from "@/services/fetch/api-error";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// 상태 + 제출
// state 관리, 수정모드 초기값 세팅, FormData 생성, 등록/수정 분기
export function useAnimalForm(
    mode: "create" | "edit", animal?: AnimalDetail) {
    const router = useRouter();

    // state
    const [form, setForm] = useState<CreateAnimalForm>({
        name: "",
        speciesId: 1,
        breedId: 1,
        // species: "",
        // breed: "",
        gender: "UNKNOWN",
        isNeutered: false,

        age: 0,
        isEstimatedAge: false,

        weight: 0,
        noticeStartDate: "",
        noticeEndDate: "",
        animalStatus: "PROTECTED",
        foundLocation: "",
        specialNotes: "",
        description: "",
        healthStatus: "",
        imgThumbnail: null,
        existingThumbnail: animal?.imgThumbnail,
        images: [],
        existingImages: [],
        deletedImages: [],
    });

    // 품종 옵션 계산
    const breedOptions = form.speciesId === 1 ?
        DOG_BREEDS : form.speciesId === 2 ?
            CAT_BREEDS : [];

    // 수정모드
    useEffect(() => {
        if (mode !== "edit" || !animal) return;

        //TODO: 백에서 speciesId, breedId 내려주기
        setForm({
            name: animal.name,
            speciesId: animal.speciesId,
            breedId: animal.breedId,
            // species: animal.species,
            // breed: animal.breed,
            gender: animal.gender,
            isNeutered: animal.isNeutered,

            age: animal.age,
            isEstimatedAge: animal.isEstimatedAge,
            weight: animal.weight,

            noticeStartDate: animal.noticeStartDate ?? "",
            noticeEndDate: animal.noticeEndDate ?? "",

            animalStatus: animal.animalStatus,

            foundLocation: animal.foundLocation ?? "",
            specialNotes: animal.specialNotes ?? "",
            description: animal.description ?? "",
            healthStatus: animal.healthStatus ?? "",

            imgThumbnail: null,
            existingThumbnail: animal?.imgThumbnail,
            images: [],
            existingImages: animal.images,
            deletedImages: [],
        });
    }, [animal, mode]);

    // 무슨기능?
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setForm(prev => ({
            ...prev, [name]:
                type === "number" ? Number(value) : value
        }));
    };

    // 드랍박스체인지(value 만 넘어옴)
    const handleSelectChange = (
        name: keyof CreateAnimalForm, value: string | number) => {
        setForm(prev => ({ ...prev, [name]: value }))
    };

    // 체크박스 체인지(체크여부)
    const handleCheckboxChange = (
        name: keyof CreateAnimalForm, checked: boolean) => {
        setForm(prev => ({ ...prev, [name]: checked }))
    };

    // 텍스트칸 체인지
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // 썸네일 체인지
    const handleThumbnailChange = (file: File | null) => {
        setForm(prev => ({ ...prev, imgThumbnail: file }));
    };

    // 이미지들 체인지
    const handleImagesChange = (files: File[], keepUrls: string[]) => {
        setForm(prev => ({
            ...prev,
            // 새 이미지
            images: files,
            // 유지되는 기존 이미지
            existingImages: keepUrls,
            // 삭제된 기존 이미지 계산
            deletedImages: prev.existingImages.filter(
                url => !keepUrls.includes(url)
            )
        }));
    };

    // 성별, 중성화 체인지
    const handleGenderChange = (value: string) => {
        const [gender, neutered] = value.split("_");

        setForm(prev => ({
            ...prev,
            gender: gender as CreateAnimalForm["gender"],
            isNeutered: neutered === "TRUE",
        }));
    };

    // 등록
    const handleSubmit = async () => {
        if (mode === "edit" && !animal) return;

        // 등록일때만 이미지필수 체크
        if (mode === "create") {
            if (!form.imgThumbnail) {
                alert("썸네일을 등록해주세요");
                return;
            }

            if (form.images.length === 0) {
                alert("보호동물 사진을 1장 이상 등록해주세요");
                return;
            }
        }

        // FormData 생성
        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("species", String(form.speciesId));
        formData.append("breed", String(form.breedId));
        formData.append("gender", form.gender);
        formData.append("isNeutered", String(form.isNeutered));

        formData.append("age", String(form.age));
        formData.append("isEstimatedAge", String(form.isEstimatedAge));

        formData.append("weight", String(form.weight));

        formData.append("noticeStartDate", form.noticeStartDate);
        formData.append("noticeEndDate", form.noticeEndDate);

        formData.append("animalStatus", form.animalStatus);

        formData.append("foundLocation", form.foundLocation);
        formData.append("specialNotes", form.specialNotes);
        formData.append("description", form.description);
        formData.append("healthStatus", form.healthStatus);


        if (form.imgThumbnail) {
            formData.append("imgThumbnail", form.imgThumbnail);
        } else if (form.existingThumbnail) {
            formData.append("existingThumbnail", form.existingThumbnail);
        }


        form.images.forEach(img => {
            formData.append("images", img);
        });

        form.existingImages.forEach(url => {
            formData.append("existingImages", url);
        });

        form.deletedImages.forEach(url => {
            formData.append("deletedImages", url);
        });

        // 등록/수정 API호출
        try {
            let response;

            if (mode === "create") {

                response = await CreateAnimal(formData);
            } else {
                if (!animal) return;
                response = await updateAnimal(animal.id, formData);
            }

            if (response?.success) {
                alert(mode === "create" ?
                    "등록되었습니다" : "수정되었습니다");
                router.push("/mypage/shelter/paw");
            }
        } catch (error) {

            if (error instanceof ApiError) {
                alert(error.message);
                return;
            }
            alert("알 수 없는 오류");
        }

    }

    return {
        form,
        setForm,

        breedOptions,
        genderOptions: GENDER_OPTIONS,
        statusOptions: STATUS_OPTIONS,

        handleChange,
        handleSelectChange,
        handleCheckboxChange,
        handleTextareaChange,
        handleThumbnailChange,
        handleImagesChange,
        handleGenderChange,
        handleSubmit
    };
}
