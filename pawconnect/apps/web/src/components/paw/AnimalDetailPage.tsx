// 보호동물 상세 페이지 클라이언트
'use client'
import Button from "@/components/common/Button";
import ImageSlider from "@/components/common/ImageSlider";
import Typography from "@/components/common/Typography";
import styles from '@/styles/paw/pawDetail.module.css'
import { AnimalDetail } from "@/types/paw/animal-detail.type";
import { useRouter } from "next/navigation";
import AnimalInfoCard from "./AnimalInfoCard";

interface AnimalDetailPageProps {
  animal: AnimalDetail;
}

export default function AnimalDetailPage({animal}: AnimalDetailPageProps) {
    // 페이지 연결
    const router = useRouter();

    return (
        <div className={styles.wrapper_detail}>
            {/* 보호소 이름 */}
            <div className={styles.shelterName}>
                <Typography variant="heading" onClick={() => router.push(`/shelter/${animal.shelterId}`)}>
                    {animal.shelterName}</Typography>
                </div>

            <div className={styles.topSection}>
                {/* 이미지들 */}
                <div className={styles.imageSection}>
                    <ImageSlider images={animal.images} size="medium" />
                </div>
                {/* 기본정보 */}
                    <AnimalInfoCard animal={animal} />
            </div>

            {/* 상세 정보 */}
            <div className={styles.bottomSection}>
                <div className={styles.descriptionCard}>
                    <Typography className={styles.sectionTitle} weight="semibold">소개</Typography>
                    <Typography>{animal.description}</Typography>
                </div>
            
                <div className={styles.healthCard}>
                    <Typography className={styles.sectionTitle} weight="semibold">건강 상태</Typography>
                    <Typography>{animal.healthStatus ?? "-"}</Typography>
                 </div>
            </div>
        </div>
    );
}