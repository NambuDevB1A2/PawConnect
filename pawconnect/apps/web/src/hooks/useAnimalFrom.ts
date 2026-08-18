// 보호동물 등록 / 수정 공용 Hook
// 담당 기능:
// 1. 보호동물 입력 Form 상태 관리
// 2. 수정 모드일 경우 기존 데이터 세팅
// 3. 이미지 추가/삭제 상태 관리
// 4. FormData 생성 후 등록/수정 API 요청

'use client'
import { DOG_BREEDS, CAT_BREEDS, GENDER_OPTIONS, STATUS_OPTIONS, } from "@/constants/animal-filter.constants";
import { CreateAnimal } from "@/services/paw/create-animal.server"
import { updateAnimal } from "@/services/paw/update-animal.server";
import { AnimalDetail } from "@/types/paw/animal-detail.type";
import { CreateAnimalForm } from "@/types/paw/animal.type";
import { ApiError } from "@/services/fetch/api-error";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

// 상태 + 제출
// state 관리, 수정모드 초기값 세팅, FormData 생성, 등록/수정 분기
export function useAnimalForm(
    mode: "create" | "edit", animal?: AnimalDetail) {
    const router = useRouter();
    
    // 중복제출방지 위해
    const [isPending, setIsPending] = useState(false);

    // 수정 시 최초 서버에서 받아온 기존 이미지 목록
    // 이미지 삭제 여부 판단 기준으로 사용
    const initialImagesRef = useRef<string[]>([]);

    // 보호동물 입력 데이터 상태
    const [form, setForm] = useState<CreateAnimalForm>({
        name: "",
        speciesId: 0,
        breedId: 0,

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

        // 새로 업로드할 썸네일
        imgThumbnail: null,
        // 기존 썸네일 유지용
        existingThumbnail: animal?.imgThumbnail,
        // 새로 추가하는 이미지 파일
        images: [],
        // 유지할 기존 이미지 URL
        existingImages: [],
        // 삭제할 기존 이미지 URL
        deletedImages: [],
    });

    // 동물 종(species)에 따른 품종 목록 변경
    const breedOptions = form.speciesId === 1 ?
        DOG_BREEDS : form.speciesId === 2 ?
            CAT_BREEDS : [];

    // 수정 모드 초기 데이터 세팅
    // 서버에서 받아온 기존 동물 정보를 Form 상태에 넣는다.
    useEffect(() => {
        // if (mode !== "edit" || !animal) return;
        // 등록 모드에서는 기존 데이터 세팅 필요 없음

        if (mode === "create") {
            initialImagesRef.current = [];
            return;
        }

        // 수정 모드인데 데이터가 없는 경우 종료
        if (!animal) return;

        // 삭제 비교를 위해 최초 이미지 저장
        initialImagesRef.current = animal.images ?? [];

        // 기존 동물 정보로 Form 초기화
        setForm({
            name: animal.name,
            speciesId: animal.speciesId,
            breedId: animal.breedId,

            gender: animal.gender,
            isNeutered: animal.isNeutered,

            age: animal.age,
            isEstimatedAge: animal.isEstimatedAge,
            weight: animal.weight,

            noticeStartDate: animal.noticeStartDate?.slice(0,10) ?? "",
            noticeEndDate: animal.noticeEndDate?.slice(0,10) ?? "",

            animalStatus: animal.animalStatus,

            foundLocation: animal.foundLocation ?? "",
            specialNotes: animal.specialNotes ?? "",
            description: animal.description ?? "",
            healthStatus: animal.healthStatus ?? "",

            imgThumbnail: null,
            existingThumbnail: animal?.imgThumbnail,
            images: [],
            existingImages: animal.images ?? [],
            deletedImages: [],
        });
    }, [animal, mode]);

    // 일반 Input 값 변경 처리
    // number 타입은 숫자로 변환
    // 빈 값은 유지 (입력 중 삭제 가능하도록)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setForm(prev => ({
            ...prev, [name]:
                type === "number" ?
                    value === "" ? "" : Number(value) : value
        }));
    };

    // Select 변경 처리 (예: 품종, 상태 선택)
    const handleSelectChange = (
        name: keyof CreateAnimalForm, value: string | number) => {
        setForm(prev => ({ ...prev, [name]: value }))
    };

    // Checkbox 변경 처리 (예: 중성화 여부)
    const handleCheckboxChange = (
        name: keyof CreateAnimalForm, checked: boolean) => {
        setForm(prev => ({ ...prev, [name]: checked }))
    };

    // TextArea 입력 변경 처리
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // 썸네일 변경 처리
    // 새 파일 선택 시 기존 썸네일 대신 저장
    const handleThumbnailChange = (file: File | null) => {
        setForm(prev => ({ ...prev, imgThumbnail: file }));
    };

    // 이미지 변경 처리
    // files: 새로 추가된 이미지 파일
    // keepUrls: 현재 유지하고 있는 기존 이미지 URL
    // deletedImages: 최초 이미지 목록과 비교하여 삭제된 이미지 계산
    const handleImagesChange = (files: File[], keepUrls: string[]) => {
        setForm(prev => ({
            ...prev,
            // 새 이미지 저장
            images: files,
            // 유지할 기존 이미지
            existingImages: keepUrls,
            // 최초 이미지 기준 삭제 이미지 계산
            deletedImages: initialImagesRef.current.filter(
                url => !keepUrls.includes(url)
            )
        }));
    };

    // 성별 + 중성화 상태 변경
    const handleGenderChange = (value: string) => {
        const [gender, neutered] = value.split("_");

        setForm(prev => ({
            ...prev,
            gender: gender as CreateAnimalForm["gender"],
            isNeutered: neutered === "TRUE",
        }));
    };

    // 등록 / 수정 제출 처리
    // Form 데이터를 FormData로 변환 후 API 호출
    const handleSubmit = async () => {
        // 수정 모드인데 동물 정보가 없는 경우 방지
        if (mode === "edit" && !animal) return;
        
        // 등록 시 이미지 필수 체크
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

        if(isPending) return;

        setIsPending(true);

        // Multipart/form-data 생성
        const formData = new FormData();

        // 기본 정보 추가
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

        // 썸네일 처리
        // 새 파일 있으면 업로드 없으면 기존 이미지 유지
        if (form.imgThumbnail) {
            formData.append("imgThumbnail", form.imgThumbnail);
        } else if (form.existingThumbnail) {
            formData.append("existingThumbnail", form.existingThumbnail);
        }

        // 새 이미지 파일 추가
        form.images.forEach(img => {
            formData.append("images", img);
        });

        // 유지 이미지 URL 추가
        form.existingImages.forEach(url => {
            formData.append("existingImages", url);
        });

        // 삭제 이미지 URL 추가
        form.deletedImages.forEach(url => {
            formData.append("deletedImages", url);
        });

        // 등록/수정 API호출
        try {
            let response;

            // 등록 / 수정 API 분기
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
        } finally {
             setIsPending(false);
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
        handleSubmit,

        isPending,
    };
}
