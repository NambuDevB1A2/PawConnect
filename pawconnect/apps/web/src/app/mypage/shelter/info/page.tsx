import ShelterForm from "@/components/mypage/ShelterForm";
import { GetShelter } from "@/services/shelters/get-shelter.server";
import styles from "@/styles/mypage/shelterInfo.module.css"

export default async function Page() {
    const shelter = await GetShelter();

    return (
        <div className={styles.wrapper_info}>
            <ShelterForm shelter={shelter?.shelter}/>
        </div>
    );
}