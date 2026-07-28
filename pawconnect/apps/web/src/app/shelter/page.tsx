import ShelterCard from "@/components/card/ShelterCard";
import Pagination from "@/components/common/Pagination";
import Typography from "@/components/common/Typography";
import { PAGE_SIZE } from "@/constants/page.constants";
import { GetShelters } from "@/services/shelters/get-shelters.server";
import styles from "@/styles/shelter/shelter.module.css"
import { PageProps } from "@/types/page.type";
import { parsePageToNumber } from "@/utils/page.util";

export default async function Page({ searchParams }: PageProps) {
    const { page } = await searchParams;
    const currentPage = parsePageToNumber(page);
    const { shelters, pagination } = await GetShelters(currentPage, PAGE_SIZE.SHELTER);

    return (
        <div className={styles.wrapper_page}>
            <div className={styles.wrapper_list}>
                <div className={styles.box_title}>
                    <Typography variant="heading">보호소 목록</Typography>
                    <Typography>총 {pagination?.totalCount}개의 보호소</Typography>
                </div>

                <div className={styles.box_list}>
                    {shelters?.map((shelter) =>
                        <ShelterCard key={shelter.id} shelter={shelter}/>
                    )}
                </div>

                <div className={styles.pagination}>
                    <Pagination
                        page={pagination?.page} 
                        maxPage={pagination?.totalPage}
                        path="/shelter" />
                </div>
            </div>
        </div>
    );
}