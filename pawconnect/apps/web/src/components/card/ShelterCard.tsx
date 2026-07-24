'use client';

import AppImage from "@/components/common/AppImage";
import Typography from "@/components/common/Typography";
import styles from "@/styles/card/ShelterCard.module.css"
import { Shelter } from "@/types/shelter/shelter.type";
import { useRouter } from "next/navigation";

interface ShelterCardProps {
    shelter: Shelter;
}

export default function ShelterCard({ shelter }: ShelterCardProps) {
    const router = useRouter();
    const imgSrc = shelter.images?.length > 0 ? shelter.images?.[0].img : "";

    const handleClick = () => {
        router.push(`/shelter/${shelter.name}`);
    }

    return (
        <div className={styles.wrapper_shelter_card} onClick={handleClick}>
            <AppImage className={styles.img_shelter} src={imgSrc}/>

            <div className={styles.box_shelter_box}>
                <Typography variant="subtitle">{shelter.name}</Typography>
                <Typography>{shelter.address}</Typography>
            </div>
        </div>
    );
}