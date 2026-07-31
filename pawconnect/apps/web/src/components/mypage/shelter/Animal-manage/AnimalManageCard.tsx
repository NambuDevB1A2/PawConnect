'use client'
import AppImage from "@/components/common/AppImage";
import Typography from "@/components/common/Typography";
import { AnimalStatusBadge } from "@/components/paw/AnimalInfoItem";
import { Animal } from "@/types/paw/animal.type";
import styles from "@/styles/mypage/shelter/animalManageCard.module.css"
import { formatDate } from "@/utils/format.util";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ModalContext } from "@/providers/ModalProvider";
import { DeleteAnimal } from "@/services/paw/delete-animal.client";


interface AnimalManageCardProps {
    animal: Animal;
}

// 동물 관리카드
export default function AnimalManageCard({ animal }: AnimalManageCardProps) {
    // 라우터연결
    const router = useRouter();
    const { openModal } = useContext(ModalContext);

    // 수정 실행
    const onClickUpdate = () => {
        // 로그인,등록된동물,마이쉴터 여부 등 체크해야할게 있나?
        // if (!login) {
        //     return;
        // }
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
            router.refresh();
        } else {
            alert("삭제에 실패했습니다");
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                {/* 동물 썸네일 이미지 */}
                <AppImage className={styles.image} src={animal.imgThumbnail} />
                {/* 동물상태 뱃지*/}
                <div className={styles.badge}>
                    <AnimalStatusBadge status={animal.animalStatus}
                        statusLabel={animal.animalStatusLabel} />
                </div>
            </div>

            <div className={styles.info}>
                {/* 동물 종류, 품종 */}
                <Typography>[{animal.species}] {animal.breed}</Typography>

                {/* 이름 */}
                <Typography variant="subtitle" className={styles.animalName}>
                    {animal.name}</Typography>

                {/* 동물 종류, 품종, 성별(중성화여부), 나이, 몸무게 */}
                <Typography className={styles.detail}>
                    {animal.gender === "MALE" ? "남아" : "여아"}
                    ({animal.isNeutered ? "중성화" : "미중성화"}) /
                    {animal.age} 개월 /
                    {animal.weight}kg
                </Typography>
                {/* 보호소 이름 */}
                <Typography className={styles.detail}>{animal.shelterName}</Typography>
                {/* 등록날짜 2026-06-30 */}
                <Typography variant="caption">{formatDate(animal.createdAt)}</Typography>
            </div>

            {/* 버튼들 */}
            <div className={styles.buttons}>
                <Button size="small" variant="success"
                    onClick={onClickUpdate}>수정</Button>
                <Button size="small" variant="danger"
                    onClick={onClickDelete}>삭제</Button>
            </div>
        </div>
    );
}