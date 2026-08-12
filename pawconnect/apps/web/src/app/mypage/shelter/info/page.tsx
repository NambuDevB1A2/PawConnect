import NotFound from "@/components/common/NotFound";
import ShelterForm from "@/components/shelter/ShelterForm";
import { GetMyShelter } from "@/services/shelters/get-my-shelter.server";
import styles from "@/styles/shelter/shelterInfo.module.css"

export default async function Page() {
    const response = await GetMyShelter();

    if (!response) {
        return <NotFound/>
    }

    const { shelter } = response;

    if (!shelter) {
        return <NotFound/>
    }

    return (
        <div className={styles.wrapper_info}>
            <ShelterForm shelter={shelter}/>
        </div>
    );
}