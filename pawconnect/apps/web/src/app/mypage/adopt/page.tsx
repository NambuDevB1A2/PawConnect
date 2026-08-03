import Empty from "@/components/common/Empty";
import NotFound from "@/components/common/NotFound";
import Pagination from "@/components/common/Pagination";
import Typography from "@/components/common/Typography";
import { PAGE_SIZE } from "@/constants/page.constants";
import styles from "@/styles/pawlog/pawlog.module.css"
import { PageProps } from "@/types/page.type";
import { parsePageToNumber } from "@/utils/page.util";
import { GetMyAdoptions } from "@/services/adopt/get-my-adoptions.server";
import AdoptionCard from "@/components/adopt/AdoptionCard";

export default async function Page({ searchParams }: PageProps) {
    const { page } = await searchParams;
    const currentPage = parsePageToNumber(page);
    const response = await GetMyAdoptions(currentPage, PAGE_SIZE.MYPAGE.ADOPT);
    
    if (!response) {
        return <NotFound/>
    }

    const { adoptions, pagination } = response;
    const hasAdoption = (pagination?.totalCount && pagination?.totalCount > 0);

    return (
        <div className={styles.wrapper_page}>
            <div className={styles.wrapper_list}>
                <div className={styles.box_title}>
                    <Typography variant="title">내 입양 신청</Typography>
                    <Typography>총 {pagination?.totalCount}개의 신청서</Typography>
                </div>

                {hasAdoption ?
                    <div className={styles.box_list}>
                        {adoptions?.map((adoption) =>
                            <AdoptionCard key={adoption.id} adoption={adoption}/>
                        )}
                    </div> :
                    <Empty className={styles.empty} text="등록된 게시글이 없습니다"></Empty>
                }
                
                <div className={styles.pagination}>
                    <Pagination
                        page={pagination?.page} 
                        maxPage={pagination?.totalPage}
                        path="/mypage/adopt" />
                </div>
            </div>
        </div>
    );
}