import AppImage from "@/components/common/AppImage";
import Typography from "@/components/common/Typography";
import styles from "@/styles/adopt/AdoptAnimalCard.module.css"
import { AnimalStatusBadge } from "@/components/paw/AnimalInfoItem";
import { AnimalDetail } from "@/types/paw/animal-detail.type";
import Icon from "@/components/common/Icon";

interface AdoptAnimalCardProps {
    animal: AnimalDetail;
}

export default function AdoptAnimalCard({ animal }: AdoptAnimalCardProps) {
    return (
        <div className={styles.wrapper_animal_card}>
            <div className={styles.wrapper_image}>
                <AppImage className={styles.img_animal} src={animal.imgThumbnail} />
            </div>

            <div className={styles.box_info}>
                <Typography className={styles.typo_detail}>
                    {animal.breed} [{animal.species}] ·
                    {animal.age} 개월 ·
                    {animal.gender === "MALE" ? "남아" : "여아"}
                </Typography>

                <Typography variant="title" className={styles.typo_animal_name}>
                    {animal.name}</Typography>

                <Typography className={styles.typo_detail}>
                    {animal.description}
                </Typography>

                <Typography className={styles.typo_detail}>
                    <Icon name="account_balance" size="badge" />
                    {animal.shelterName}
                </Typography>
            </div>
            
            <div className={styles.badge}>
                <AnimalStatusBadge status={animal.animalStatus}
                    statusLabel={animal.animalStatusLabel} />
            </div>
        </div>
    );
}