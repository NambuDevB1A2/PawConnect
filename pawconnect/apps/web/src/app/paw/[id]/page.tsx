import Button from "@/components/common/Button";
import ImageSlider from "@/components/common/ImageSlider";
import Typography from "@/components/common/Typography";
import { getAnimalDetail } from "@/services/paw/get-animal-detail.server";
import styles from '@/styles/paw/pawDetail.module.css'

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const { animal } = await getAnimalDetail(Number(id));

    return (
        <div className={styles.wrapper}>
            {/* 보호소 이름 */}
            <Typography variant="subtitle">{animal.shelterName}</Typography>

            {/* 이미지들 */}
            <div className={styles.imageWrapper}>
                <ImageSlider images={animal.images} size="medium" />
            </div>
            {/* 기본정보 */}
            <div className={styles.box_info}>
                <div className={styles.badge}>
                    {animal.animalStatusLabel}</div>
                <div>
                    <Typography variant="subtitle">{animal.name}</Typography>
                    <Typography variant="body1">
                        {animal.breed} ·
                        {animal.gender === "MALE" ? "남아" : "여아"}
                        {animal.isNeutered ? "(중성화 O)" : "(중성화 X)"} ·
                        {animal.age} 개월 ·
                        {animal.weight} kg</Typography>
                </div>

                {/* 보호소 */}
                <div className={styles.shelterSection}>
                    <div className={styles.boxTypo}>
                        <Typography weight="semibold">공고기간</Typography>
                        <Typography>{animal.noticeStartDate}
                                {" ~ "}
                                {animal.noticeEndDate}
                        </Typography>
                        <Typography weight="semibold">동물상태</Typography>
                        <Typography>{animal.animalStatusLabel}</Typography>
                    </div>
                    <div className={styles.boxTypo}>
                        <Typography weight="semibold">발견 장소</Typography>
                        <Typography>{animal.foundLocation ?? "-"}</Typography>
                        <Typography weight="semibold">특이사항</Typography>
                        <Typography>{animal.specialNotes ?? "-"}</Typography>
                        <Typography weight="semibold">보호센터</Typography>
                        <Typography>{animal.shelterName}</Typography>
                    </div>
                </div>
                
                {/* 버튼 */}
                <Button className={styles.searchButton}
                    variant="primary">입양 신청</Button>
            </div>
            {/* 상세 정보 */}
                <div className={styles.detailSection}>
                    <Typography weight="semibold">소개</Typography>
                        <Typography>{animal.description}</Typography>
                        <Typography weight="semibold">건강 상태</Typography>
                        <Typography>{animal.healthStatus ?? "-"}</Typography>                  
                </div>
        </div>
    );
}