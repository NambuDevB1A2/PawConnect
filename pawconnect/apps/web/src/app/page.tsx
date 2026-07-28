import Empty from "@/components/common/Empty";
import Typography from "@/components/common/Typography";
import AnimalCard from "@/components/paw/AnimalCard";
import ShelterCard from "@/components/shelter/ShelterCard";
import { Home } from "@/services/home/home.server";
import styles from "@/styles/home/home.module.css"

export default async function Page() {
    const response = await Home();

    if (!response) {
        return null;
    }

    const { animals, shelter } = response;

    return (
        <div className={styles.wrapper_page}>
            <div className={styles.wrapper_banner}>
                
            </div>

            <div className={styles.wrapper_card}>
                <div className={styles.box_animal}>
                    <Typography variant="title">최신 등록 보호동물</Typography>
                    <div className={styles.box_animal_list}>
                        {animals.length > 0 ?
                            animals.map((animal) =>
                                <AnimalCard key={animal.id} animal={animal} />
                            ) :
                            <Empty text="등록된 보호소가 없습니다"/>}
                    </div>
                </div>
                
                <div className={styles.box_shelter}>
                    <Typography variant="title">신규 보호소</Typography>
                    <div className={styles.box_shelter_card}>
                        {shelter ?
                            <ShelterCard shelter={shelter}/> :
                            <Empty text="등록된 보호소가 없습니다"/>}
                    </div>
                </div>
            </div>
        </div>
    );
}
