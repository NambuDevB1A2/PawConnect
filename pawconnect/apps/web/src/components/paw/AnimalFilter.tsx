// 동물메인 검색/필터
'use client'
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import Typography from "@/components/common/Typography";

import styles from "@/styles/paw/AnimalFilter.module.css";
import InputSearch from "../common/InputSearch";

export default function AnimalFilter() {
    return (
        <aside className={styles.wrapper} >
            <Typography variant='subtitle'>보호동물 검색</Typography>

            {/* 검색 입력칸 */}
            <InputSearch labelText="검색" placeholder="동물이름 또는 보호소" 
                    onClick={() => {}}/>
            
            {/* 드랍박스 */}
            <Select labelText="동물" labelPosition="top"
                labelSize="small"
                helperText="동물을 선택하세요"
                options={[
                    // { label: "전체", value: "" },
                    { label: "개", value: "DOG" },
                    { label: "고양이", value: "CAT" },
                ]}
                onChange={() => { }}
            // disabled
            />

            <Select labelText="품종" helperText="품종을 선택하세요"
                labelPosition="top"
                options={[
                    { label: "푸들", value: "lessOne" },
                    { label: "믹스견", value: "oneToThree" },
                    { label: "리트리버", value: "threeToFive" },
                    { label: "코리안숏헤어", value: "overFive" },
                ]}
                onChange={() => { }}
            />
            <Select labelText="성별" helperText="성별을 선택하세요"
                labelPosition="top"
                options={[
                    { label: "여아(중성화 O)", value: "FEMALE1" },
                    { label: "여아(중성화 X)", value: "FEMALE2" },
                    { label: "남아(중성화 O)", value: "MALE1" },
                    { label: "남아(중성화 X)", value: "MALE2" },
                ]}
                onChange={() => { }}
            />
            <Select labelText="나이" helperText="나이를 선택하세요"
                labelPosition="top"
                options={[
                    { label: "0~6개월", value: "UNDER6" },
                    { label: "6개월~1년", value: "6_TO_ONEYEAR" },
                    { label: "1~7세", value: "ONEYEAR_TO_SEVENYEAR" },
                    { label: "7세 이상", value: "OVER7" },
                    { label: "확인 불가", value: "e" },
                ]}
                onChange={() => { }}

            />
            <Select labelText="상태" helperText="상태를 선택하세요"
                labelPosition="top"
                options={[
                    { label: "보호중", value: "f" },
                    { label: "공고중", value: "AVAILABLE" },
                    { label: "입양완료", value: "ADOPTED" },
                ]}
                onChange={() => { }}
            />

            <Button className={styles.searchButton} fullWidth variant="secondary">검색</Button>
        </aside>
    );
}