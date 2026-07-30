import NotFound from "@/components/common/NotFound";
import AnimalDetailPage from "@/components/paw/AnimalDetailPage";
import { getAnimalDetail } from "@/services/paw/get-animal-detail.server";
import styles from '@/styles/paw/pawDetail.module.css'

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const response = await getAnimalDetail(Number(id));

    if(!response) return <NotFound />;

    const { animal } = response; 

    return (
        <div className={styles.wrapper}>
            <AnimalDetailPage animal={animal} />            
        </div>
    );
}