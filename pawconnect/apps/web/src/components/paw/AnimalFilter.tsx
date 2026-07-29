// 동물메인 검색/필터
'use client'
import Button from "@/components/common/Button";
import Select from "@/components/common/Select";
import Typography from "@/components/common/Typography";

import styles from "@/styles/paw/AnimalFilter.module.css";
import InputSearch from "../common/InputSearch";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimalFilterParams } from "@/types/paw/animal-filter.type";
import { AnimalGender, AnimalStatus } from "@/types/paw/animal.type";


interface SelectProps {
    value?: string;
    onChange: (value: string) => void;
}

export default function AnimalFilter() {
    const router = useRouter();
    // 검색 버튼 스타일
    const [filter, setFilter] = useState<AnimalFilterParams>({
        keyword: "",
        species: undefined,
        breed: undefined,
        gender: undefined,
        isNeutered: undefined,
        ageFilter: undefined,
        status: undefined
    });
   
    // 검색 기능
    const handleSearch = () => {
        const params = new URLSearchParams();

        Object.entries(filter).forEach(([key, value]) => {
            if (value !== undefined && value !== "") {
                params.set(key, String(value))
            }
        })
        params.set("page", "1")
        handleReset();
        router.push(`/paw?${params.toString()}`);
    };

    // 검색칸 초기화
    const handleReset = () => {
        setFilter({
            keyword: "",
            species: undefined,
            breed: undefined,
            gender: undefined,
            isNeutered: undefined,
            ageFilter: undefined,
            status: undefined,
        });
        router.push("/paw?page=1");
    };

    const genderOptions = [
        { label: "여아(중성화 O)", value: "FEMALE_TRUE" },
        { label: "여아(중성화 X)", value: "FEMALE_FALSE" },
        { label: "남아(중성화 O)", value: "MALE_TRUE" },
        { label: "남아(중성화 X)", value: "MALE_FALSE" },
    ];

    return (
        <aside className={styles.wrapper} >
            <Typography variant='subtitle'>보호동물 검색</Typography>
            {/* TODO: 초기화버튼 삽입 및 기능구현 */}
            <Button fullWidth variant="outline"
                onClick={handleReset}>🔃</Button>

            {/* 검색 입력칸 */}
            <InputSearch labelText="검색" placeholder="동물이름 또는 보호소"
                value={filter.keyword}
                onChange={(e) => { setFilter({ ...filter, keyword: e.target.value }) }} />

            {/* 드랍박스 */}
            <Select labelText="동물" labelPosition="top"
                labelSize="small"
                helperText="동물을 선택하세요"
                options={[
                    // { label: "전체", value: "" },
                    { label: "개", value: "1" },
                    { label: "고양이", value: "2" },
                ]}
                onChange={(value) => {
                    setFilter(prev => ({
                        ...prev, species: Number(value)
                    }));
                }}
            // disabled
            />

            <Select labelText="품종" helperText="품종을 선택하세요"
                labelPosition="top"
                options={[
                    { label: "믹스견", value: "1" },
                    { label: "말티즈", value: "2" },
                    { label: "푸들", value: "3" },
                    { label: "포메라니안", value: "4" },
                    { label: "진돗개", value: "5" },
                    { label: "시츄", value: "6" },
                    { label: "치와와", value: "7" },
                    { label: "코카스파니엘", value: "8" },
                    { label: "웰시코기", value: "9" },
                    { label: "리트리버", value: "10" },
                    { label: "코리안숏헤어", value: "11" },
                    { label: "러시안블루", value: "12" },
                    { label: "페르시안", value: "13" },
                    { label: "브리티시숏헤어", value: "14" },
                    { label: "먼치킨", value: "15" },
                    { label: "스코티시폴드", value: "16" },
                ]}
                onChange={(value) => { setFilter({ ...filter, breed: Number(value) }) }}
            />
            <Select labelText="성별" helperText="성별을 선택하세요"
                labelPosition="top"
                options={genderOptions}
                onChange={(value) => {
                    const [gender, neutered] = value.split("_");
                    setFilter(prev => ({
                        ...prev,
                        gender: gender as AnimalGender,
                        isNeutered: neutered === "TRUE"
                    }));
                }}
            />
            <Select labelText="나이" helperText="나이를 선택하세요"
                labelPosition="top"
                options={[
                    { label: "0~6개월", value: "1" },
                    { label: "6개월~1년", value: "2" },
                    { label: "1~7세", value: "3" },
                    { label: "7세 이상", value: "4" },
                    { label: "확인 불가", value: "5" },
                ]}
                onChange={(value) => {
                    setFilter(prev => ({
                        ...prev, ageFilter: Number(value)
                    }));
                }}
            />
            <Select labelText="상태" helperText="상태를 선택하세요"
                labelPosition="top"
                options={[
                    { label: "보호중", value: "PROTECTED" },
                    { label: "공고중", value: "AVAILABLE" },
                    { label: "입양완료", value: "ADOPTED" },
                    { label: "귀가완료", value: "REUNITED" },
                    { label: "자연사", value: "DECEASED" },
                    { label: "안락사", value: "EUTHANIZED" },
                ]}
                onChange={(value) => {
                    setFilter(prev => ({
                        ...prev, status: value as AnimalStatus
                    }));
                }}
            />

            <Button className={styles.searchButton} fullWidth variant="secondary"
                onClick={handleSearch}>검색</Button>
        </aside>
    );
}

// <Select
//     labelText="성별"
//     helperText="성별을 선택하세요"
//     labelPosition="top"
//     options={[
//         {
//             label:"여아(중성화 O)",
//             value:"FEMALE_TRUE"
//         },
//         {
//             label:"여아(중성화 X)",
//             value:"FEMALE_FALSE"
//         },
//         {
//             label:"남아(중성화 O)",
//             value:"MALE_TRUE"
//         },
//         {
//             label:"남아(중성화 X)",
//             value:"MALE_FALSE"
//         },
//     ]}
//     onChange={(value)=>{

//         const [gender, neutered] = value.split("_");

//         setFilter({
//             ...filter,
//             gender: gender as AnimalGender,
//             isNeutered: neutered === "TRUE"
//         });

//     }}
// />