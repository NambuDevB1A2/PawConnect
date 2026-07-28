import Typography from "@/components/common/Typography";
import { PAGE_SIZE } from "@/constants/page.constants";
import { getAnimals } from "@/services/paw/get-animals.server";
import { parsePageToNumber } from "@/utils/page.util";
import Pagination from "@/components/common/Pagination";
import styles from "@/styles/paw/paw.module.css"
import AnimalCard from "@/components/paw/AnimalCard";
import AnimalFilter from "@/components/paw/AnimalFilter";

interface PageProps {
    searchParams?: Promise<{ page?: string; }>;
}

export default async function Page({ searchParams }: PageProps) {

    // 페이지 네이션 query parameter
    const params = await searchParams
    // 현재 페이지 번호
    const currentPage = parsePageToNumber(params?.page);
    // 보호동물 목록 조회
    const { animals, pagination } = await getAnimals(currentPage, PAGE_SIZE.ANIMAL);

    return (
        <div className={styles.wrapper_page}>
            {/* 왼쪽 */}
            {/* 검색 및 필터 구간 */}
            <AnimalFilter />

                    {/* <div className={styles.filter_box}> */}
                        {/* <Typography variant="subtitle">검색 및 필터 🔃</Typography>
                        <Typography variant="body1">[검색어...]🔎</Typography>
                        <Typography variant="body1">[종류 ▼🔽] [품종 ▼🔽]</Typography>
                        <Typography variant="body1">[성별 ▼]</Typography>
                        <Typography variant="body1">[나이 ▼]</Typography>
                        <Typography variant="body1">[동물 상태 ▼]</Typography>
                        <button>검색</button> */}
                    {/* </div> */}

            <div className={styles.wrapper_list}>

                <div className={styles.box_title}>
                    <Typography variant="heading"> 보호 동물 </Typography>
                    {/* <Typography> 총 {pagination.totalCount}마리</Typography> */}
                </div>
                
                <div className={styles.content}>

                    {/* 오른쪽 */}
                    <div className={styles.list_section}>
                        {/* 보호동물 목록 구간 */}
                        <div className={styles.box_list}>
                            {/* 동물 전체 조회 */}
                            {animals.map((animal) => (
                                <AnimalCard key={animal.id} animal={animal} />
                            ))}
                        </div>

                        {/* 페이지네이션 구간 */}
                        <div className={styles.pagination}>
                            <Pagination page={pagination.page}
                                maxPage={pagination.totalPage}
                                path="/paw" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}