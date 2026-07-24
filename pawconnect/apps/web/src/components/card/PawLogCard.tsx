'use client';

import AppImage from "@/components/common/AppImage";
import Typography from "@/components/common/Typography";
import styles from "@/styles/card/PawLogCard.module.css"
import { PetPost } from "@/types/pawlog/petpost.type";
import { useRouter } from "next/navigation";

interface PetPostCardProps {
    petPost: PetPost;
}

export default function PetPostCard({ petPost }: PetPostCardProps) {
    const router = useRouter();
    const imgSrc = petPost.images?.length > 0 ? petPost.images?.[0].img : "";

    const handleClick = () => {
        router.push(`/pawlog/${petPost.id}`);
    }

    return (
        <div className={styles.wrapper_pawlog_card} onClick={handleClick}>
            <AppImage className={styles.img_pawlog} src={imgSrc}/>

            <div className={styles.box_pawlog}>
                <div className={styles.box_author}>
                    <AppImage className={styles.img_author_profile} src={petPost.author.imgProfile} />
                    <Typography>{petPost.author.nickname}</Typography>
                    <Typography className={styles.typo_at}>{petPost.updatedAt}</Typography>
                </div>

                <div className={styles.box_info}>
                    <Typography variant="subtitle">{petPost.title}</Typography>
                    <Typography className={styles.typo_content}>{petPost.content}</Typography>
                </div>
            </div>
        </div>
    );
}