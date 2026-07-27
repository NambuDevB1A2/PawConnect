import NotFound from "@/components/common/NotFound";
import ShelterForm from "@/components/shelter/ShelterForm";
import { GetShelter } from "@/services/shelters/get-shelter.server";
import styles from "@/styles/shelter/shelterInfo.module.css"

export default async function Page() {
    const { shelter } = await GetShelter();

    if (!shelter) {
        return <NotFound/>
    }

    return (
        <div className={styles.wrapper_info}>
            <ShelterForm shelter={shelter}/>
        </div>
    );
}