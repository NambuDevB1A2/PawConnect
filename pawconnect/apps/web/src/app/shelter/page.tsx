import ShelterCard from "@/components/shelter/ShelterCard";
import Empty from "@/components/common/Empty";
import NotFound from "@/components/common/NotFound";
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
    const response = await GetShelters(currentPage, PAGE_SIZE.SHELTER);

    if (!response) {
        return <NotFound/>
    }

    const { shelters, pagination } = response;
    const hasShelters = (pagination?.totalCount && pagination?.totalCount > 0);

    return (
        <div className={styles.wrapper_page}>
            <div className={styles.wrapper_list}>
                <div className={styles.box_title}>
                    <Typography variant="heading">보호소 목록</Typography>
                    <Typography className={styles.typo_count}>총 {pagination?.totalCount}개의 보호소</Typography>
                </div>

                {hasShelters ?
                    <div className={styles.box_list}>
                        {shelters?.map((shelter) =>
                            <ShelterCard key={shelter.id} shelter={shelter}/>
                        )}
                    </div> :
                    <Empty className={styles.empty} text="등록된 보호소가 없습니다"/>
                }

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