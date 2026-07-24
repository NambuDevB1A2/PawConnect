import ShelterCard from "@/components/card/ShelterCard";
import Typography from "@/components/common/Typography";
import { GetShelters } from "@/services/shelters/get-shelters.server";
import styles from "@/styles/shelter/shelter.module.css"

export default async function Page() {
    const shelters = await GetShelters();

    return (
        <div className={styles.wrapper_page}>
            <div className={styles.wrapper_list}>
                <Typography variant="heading">보호소 목록</Typography>

                <div className={styles.box_list}>
                    {shelters?.shelters?.map((shelter) =>
                        <ShelterCard key={shelter.id} shelter={shelter}/>
                    )}
                </div>
            </div>
        </div>
    );
}