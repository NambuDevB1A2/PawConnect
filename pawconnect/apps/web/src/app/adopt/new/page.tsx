import AdoptAnimalCard from "@/components/adopt/AdoptAnimalCard";
import AdoptForm from "@/components/adopt/AdoptForm";
import NotFound from "@/components/common/NotFound";
import Typography from "@/components/common/Typography";
import { getAnimalDetail } from "@/services/paw/get-animal-detail.server";
import styles from "@/styles/adopt/adoptNew.module.css";

export default async function Page({ searchParams }: { searchParams: Promise<{ animalId: number }>}) {
    const { animalId } = await searchParams;
    const response = await getAnimalDetail(Number(animalId));

    if (!response) {
        return <NotFound/>
    }
    
    const { animal } = response;

    return (
        <div className={styles.wrapper_page}>
            <Typography variant="heading">입양 신청</Typography>
            <AdoptAnimalCard animal={animal}/>
            <AdoptForm animal={animal}/>
        </div>
    );
}