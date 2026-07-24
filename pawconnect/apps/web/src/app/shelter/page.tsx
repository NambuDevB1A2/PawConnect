import ShelterCard from "@/components/card/ShelterCard";
import Pagination from "@/components/common/Pagination";
import Typography from "@/components/common/Typography";
import { GetShelters } from "@/services/shelters/get-shelters.server";
import styles from "@/styles/shelter/shelter.module.css"
import { PageProps } from "@/types/page.type";

export default async function Page({ searchParams }: PageProps) {
    const { page } = await searchParams;
    const shelters = await GetShelters(Number(page ?? 1), 6);

    return (
        <div className={styles.wrapper_page}>
            <div className={styles.wrapper_list}>
                <div className={styles.box_title}>
                    <Typography variant="heading">보호소 목록</Typography>
                    <Typography>총 {shelters?.pagination?.total}개의 보호소</Typography>
                </div>

                <div className={styles.box_list}>
                    {shelters?.shelters?.map((shelter) =>
                        <ShelterCard key={shelter.id} shelter={shelter}/>
                    )}
                </div>

                <div className={styles.pagination}>
                    <Pagination
                        page={shelters?.pagination?.page} 
                        maxPage={shelters?.pagination?.totalPage}
                        path="/shelter" />
                </div>
            </div>
        </div>
    );
}