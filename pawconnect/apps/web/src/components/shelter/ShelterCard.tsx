'use client';

import AppImage from "@/components/common/AppImage";
import Badge from "@/components/common/Badge";
import Typography from "@/components/common/Typography";
import MyShelterOptions from "@/components/shelter/MyShelterOptions";
import { AuthContext } from "@/providers/AuthProvider";
import styles from "@/styles/shelter/ShelterCard.module.css"
import { Shelter } from "@/types/shelter/shelter.type";
import { useRouter } from "next/navigation";
import { useContext } from "react";

interface ShelterCardProps {
    shelter: Shelter;
}

export default function ShelterCard({ shelter }: ShelterCardProps) {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const imgSrc = shelter.images?.length > 0 ? shelter.images?.[0].img : shelter.imgBanner;

    const handleClick = () => {
        router.push(`/shelter/${shelter.name}`);
    }

    const isMyShelter = user?.shelterId === shelter.id;

    return (
        <div className={styles.wrapper_shelter_card} onClick={handleClick}>
            <AppImage className={styles.img_shelter} src={imgSrc}/>

            {isMyShelter && 
                <Badge className={styles.badge_my_shelter} variant="completed">내 보호소</Badge>
            }

            <div className={styles.box_shelter_info}>
                <div className={styles.box_shelter_title}>
                    <Typography variant="subtitle">{shelter.name}</Typography>
                    {/* <MyShelterOptions shelter={shelter}/> */}
                </div>
                <Typography className={styles.typo_address} variant="body2">{shelter.address}</Typography>
                <Typography className={styles.typo_animal_count} variant="body2">총 {shelter._count.animals}마리 보호 중</Typography>
            </div>
            
        </div>
    );
}