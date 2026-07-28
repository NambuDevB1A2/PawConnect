// 동물 카드
'use client'
import AppImage from "@/components/common/AppImage";
import Typography from "@/components/common/Typography";
import type { AnimalCard as Animal } from "@/types/paw/animal.type";
import { formatDate } from "@/utils/format.util";
import styles from "@/styles/card/pawCard.module.css"
import { useRouter } from "next/router";

interface AnimalCardProps {
    animal: Animal;
}

export default function AnimalCard({ animal }: AnimalCardProps) {
    // 상세페이지 연결
    // const router = useRouter();

    return (

        // <div className={styles.wrapper} onClick={() => router.push(`/paw/${animal.id}`)}>


        <div className={styles.wrapper_animal_card}>

            {/* 상세연결 */}
            {/* <div className={styles.wrapper}
                onClick={() => router.push(`/paw/${animal.id}`)}>
            </div> */}

            <div className={styles.imageWrapper}>
                {/* 동물 썸네일 이미지 */}
                <AppImage className={styles.img_animal} src={animal.imgThumbnail} />
                {/* 동물상태 뱃지*/}
                <div className={styles.badge}>{animal.animalStatusLabel}</div>
            </div>

            <div className={styles.box_info}>
                {/* 이름 */}
                <Typography variant="subtitle" className={styles.animalName}>
                    {animal.name}</Typography>
                {/* 동물 종류 · 품종*/}
                {/* <div className={styles.box_top}>                    
                    <Typography variant="caption" className={styles.typo_species}>
                        [{animal.species}] {animal.breed}</Typography>
                </div> */}

                {/* 성별(중성화여부), 나이, 몸무게 */}
                <Typography className={styles.typo_detail}>
                    {animal.breed} [{animal.species}] ·
                    {animal.age} 개월 ·
                    {animal.gender === "MALE" ? "남아" : "여아"}
                    {/* ({animal.isNeutered ? "중성화" : "미중성화"}) · */}
                    {/* {animal.weight}kg */}
                </Typography>
                {/* 보호소 이름 */}
                <Typography className={styles.typo_detail}>{animal.shelterName}</Typography>
                {/* 등록날짜 2026-06-30 */}
                {/* <Typography variant="caption">{formatDate(animal.createdAt)}</Typography> */}
            </div>
        </div>
        //    </div>
    );
}