import PawLogCard from "@/components/card/PawLogCard";
import Empty from "@/components/common/Empty";
import Pagination from "@/components/common/Pagination";
import Typography from "@/components/common/Typography";
import NewPawLogButton from "@/components/mypage/pawlog/NewPawLogButton";
import { PAGE_SIZE } from "@/constants/page.constants";
import { GetMyPawLogs } from "@/services/pawlog/get-my-pawlogs.server";
import styles from "@/styles/pawlog/pawlog.module.css"
import { PageProps } from "@/types/page.type";
import { parsePageToNumber } from "@/utils/page.util";

export default async function Page({ searchParams }: PageProps) {
    const { page } = await searchParams;
    const currentPage = parsePageToNumber(page);
    const { pawLogs, pagination } = await GetMyPawLogs(currentPage, PAGE_SIZE.MYPAGE.PAWLOG);
    
    const hasPawLogs = (pagination?.totalCount && pagination?.totalCount > 0);

    return (
        <div className={styles.wrapper_page}>
            <div className={styles.wrapper_list}>
                <div className={styles.box_title}>
                    <Typography variant="title">내가 등록한 PawLog</Typography>
                    <Typography>총 {pagination?.totalCount}개의 게시글</Typography>
                </div>

                <NewPawLogButton/>

                <div className={styles.box_list}>
                    {hasPawLogs ?
                        pawLogs?.map((pawLog) =>
                            <PawLogCard key={pawLog.id} pawLog={pawLog}/>
                        ) :
                        <Empty text="등록된 게시글이 없습니다"></Empty>
                    }
                </div>
                
                <div className={styles.pagination}>
                    <Pagination
                        page={pagination?.page} 
                        maxPage={pagination?.totalPage}
                        path="/mypage/pawlog" />
                </div>
            </div>
        </div>
    );
}