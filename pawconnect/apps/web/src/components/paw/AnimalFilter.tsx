// 동물메인 검색/필터
'use client'
import Button from "@/components/common/Button";
import Select from "@/components/common/Select";
import Typography from "@/components/common/Typography";

import styles from "@/styles/paw/AnimalFilter.module.css";
import InputSearch from "../common/InputSearch";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimalFilterParams } from "@/types/paw/animal-filter.type";
import { AnimalGender, AnimalStatus } from "@/types/paw/animal.type";
import IconButton from "@/components/common/IconButton";
import { CAT_BREEDS, DOG_BREEDS } from "@/constants/animal-filter.constants";


export default function AnimalFilter() {
    const router = useRouter();
    // 검색
    const searchParams = useSearchParams();

    // URL Query -> 필터 상태 변환
    const getFilterFromParams = (params: ReturnType<typeof useSearchParams>)
        : AnimalFilterParams => ({
            keyword: searchParams.get("keyword") ?? "",
            species: searchParams.get("species") ?
                Number(searchParams.get("species")) : undefined,
            breed: searchParams.get("breed") ?
                Number(searchParams.get("breed")) : undefined,
            gender: (searchParams.get("gender") as AnimalGender) ?? undefined,
            isNeutered: searchParams.get("isNeutered") === null ?
                undefined : searchParams.get("isNeutered") === "true",
            ageFilter: searchParams.get("ageFilter") ?
                Number(searchParams.get("ageFilter")) : undefined,
            status: (searchParams.get("status") as AnimalStatus) ?? undefined,
        });

    // 검색 버튼 스타일
    const [filter, setFilter] = useState(getFilterFromParams(searchParams));

    // 초기화
    useEffect(() => {
        //reset=ture로 들어왔으면 완전 초기화
        if (searchParams.get("reset") === "true") {
            router.replace("/paw");
            return;
        }
        //URL 기준으로 filter 다시 세팅
        setFilter(getFilterFromParams(searchParams));
    }, [searchParams]);

    // 검색 기능
    const handleSearch = () => {
        const params = new URLSearchParams();

        Object.entries(filter).forEach(([key, value]) => {
            if (value !== undefined && value !== "") {
                params.set(key, String(value))
            }
        })
        params.set("page", "1")
        router.push(`/paw?${params.toString()}`);
    };

    // 검색칸 초기화
    const resetFilter = () => {
        setFilter({
            keyword: "",
            species: undefined,
            breed: undefined,
            gender: undefined,
            isNeutered: undefined,
            ageFilter: undefined,
            status: undefined,
        });
        // router.push("/paw");
    };

    // 전체 품종 나오게
    const allBreeds = [
        ...DOG_BREEDS,
        ...CAT_BREEDS,
    ];
    // 선택한 동물에 따라 품종 나오게
    const breedOptions = filter.species === 1 ? DOG_BREEDS :
        filter.species === 2 ? CAT_BREEDS : allBreeds;

    // 성별(중성화) 옵션
    const genderOptions = [
        { label: "여아(중성화 O)", value: "FEMALE_TRUE" },
        { label: "여아(중성화 X)", value: "FEMALE_FALSE" },
        { label: "남아(중성화 O)", value: "MALE_TRUE" },
        { label: "남아(중성화 X)", value: "MALE_FALSE" },
    ];

    return (
        <aside className={styles.wrapper} >
            <div className={styles.headerRow}>
                <Typography variant='subtitle'>보호동물 검색</Typography>
                {/* 초기화버튼 */}
                <IconButton name="refresh" wrapperBorder={false} color="color_default"
                    onClick={resetFilter} title="검색 조건 초기화" />
            </div>

            {/* 검색 입력칸 */}
            <InputSearch labelText="검색" placeholder="동물이름 또는 보호소"
                value={filter.keyword}
                onChange={(e) => { setFilter({ ...filter, keyword: e.target.value }) }} />

            {/* 드랍박스 */}
            <Select labelText="동물" labelPosition="top"
                labelSize="small"
                helperText="동물을 선택하세요"
                value={filter.species?.toString()}
                options={[
                    { label: "개", value: "1" },
                    { label: "고양이", value: "2" }
                ]}
                onChange={(value) => {
                    setFilter(prev => ({
                        ...prev, species: Number(value), breed: undefined,
                    }));
                }}
            // disabled
            />

            <Select labelText="품종" helperText="품종을 선택하세요"
                labelPosition="top"
                value={filter.breed?.toString()}
                options={breedOptions}
                onChange={(value) => { setFilter({ ...filter, breed: Number(value) }) }}
            />
            <Select labelText="성별" helperText="성별을 선택하세요"
                labelPosition="top"
                value={
                    filter.gender ?
                        `${filter.gender}_${filter.isNeutered ? "TRUE" : "FALSE"}` : undefined
                }
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
                value={filter.ageFilter?.toString()}
                options={[
                    { label: "0~6개월", value: "1" },
                    { label: "6개월~1년", value: "2" },
                    { label: "1~7세", value: "3" },
                    { label: "7세 이상", value: "4" },
                    // { label: "확인 불가", value: "5" },
                ]}
                onChange={(value) => {
                    setFilter(prev => ({
                        ...prev, ageFilter: Number(value)
                    }));
                }}
            />
            <Select labelText="상태" helperText="상태를 선택하세요"
                labelPosition="top"
                value={filter.status}
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