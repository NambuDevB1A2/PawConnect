import Button from "@/components/common/Button";
import ImageSlider from "@/components/common/ImageSlider";
import Typography from "@/components/common/Typography";
import AnimalDetailPage from "@/components/paw/AnimalDetailPage";
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
            <AnimalDetailPage animal={animal} />            
        </div>
    );
}