// 보호동물 상세 페이지 클라이언트
'use client'

import ImageSlider from "@/components/common/ImageSlider";
import Typography from "@/components/common/Typography";
import styles from '@/styles/paw/pawDetail.module.css'
import { AnimalDetail } from "@/types/paw/animal-detail.type";
import { useRouter } from "next/navigation";
import AnimalInfoCard from "./AnimalInfoCard";
import IconButton from "@/components/common/IconButton";
import { DeleteAnimal } from "@/services/paw/delete-animal.client";
import { useContext } from "react";
import { ModalContext } from "@/providers/ModalProvider";
import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";

interface AnimalDetailPageProps {
    animal: AnimalDetail;
}

export default function AnimalDetailPage({ animal }: AnimalDetailPageProps) {
    // 라우터연결
    const router = useRouter();
    const { user } = useContext(AuthContext);
    const { openModal } = useContext(ModalContext);

    // 수정 실행
    const onClickUpdate = () => {
        // 수정 페이지로 이동
        router.push(`/mypage/shelter/paw/edit/${animal.id}`);
    }

    // 삭제 실행
    const onClickDelete = () => {
        // 로그인,등록된동물,마이쉴터 여부 등 체크해야할게 있나?
        // 모달 오픈
        openModal("confirmDelete",
            {
                onConfirm: handleConfirmDelete,
                targetName: animal.name
            });
    }

    const handleConfirmDelete = async () => {
        const res = await DeleteAnimal(animal.id);

        if (res?.success) {
            alert("삭제되었습니다");
            router.push("/paw");
        } else {
            alert("삭제에 실패했습니다");
        }
    };

    return (
        <div className={styles.wrapper_detail}>
            {/* 보호소 이름 (보호소로 이동)*/}
            <div className={styles.shelterName}>
                <Link href={`/shelter/${encodeURIComponent(animal.shelterName)}`}
                    className={styles.shelterLink}>
                    <Typography variant="heading">
                        {animal.shelterName}
                    </Typography>
                </Link>
                {/* 버튼들 */}
                {user?.shelterId === animal.shelterId && <div className={styles.buttons}>
                    <IconButton name="edit" color="color_default"
                        aria-label="수정" onClick={() => { onClickUpdate(); }}
                        title="수정" />
                    <IconButton name="delete" color="color_default"
                        aria-label="삭제" onClick={() => { onClickDelete(); }}
                        title="삭제" />
                </div>}
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