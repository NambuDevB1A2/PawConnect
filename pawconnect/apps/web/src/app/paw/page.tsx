import Typography from "@/components/common/Typography";
import { PAGE_SIZE } from "@/constants/page.constants";
import { getAnimals } from "@/services/paw/get-animals.server";
import { parsePageToNumber } from "@/utils/page.util";
import Pagination from "@/components/common/Pagination";
import styles from "@/styles/paw/paw.module.css"
import AnimalCard from "@/components/paw/AnimalCard";
import AnimalFilter from "@/components/paw/AnimalFilter";
import NotFound from "@/components/common/NotFound";
import Empty from "@/components/common/Empty";

interface PageProps {
    searchParams?: Promise<{
        page?: string;
        keyword?: string;
        species?: string;
        breed?: string;
        gender?: string;
        isNeutered?: string;
        ageFilter?: string;
        status?: string;
    }>;
}

export default async function Page({ searchParams }: PageProps) {
    // 페이지 네이션 query parameter
    const params = await searchParams
    // 현재 페이지 번호
    const currentPage = parsePageToNumber(params?.page);
    // 보호동물, 페이지네이션
    const response = await getAnimals(currentPage, PAGE_SIZE.ANIMAL, params);
    if(!response) return <NotFound />;

    const { animals, pagination } = response;

    if(animals.length === 0) return <Empty text="등록된 동물이 없습니다" />;

    return (
        <div className={styles.wrapper_page}>
            {/* 왼쪽 */}
            {/* 검색 및 필터 구간 */}
            <AnimalFilter />
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