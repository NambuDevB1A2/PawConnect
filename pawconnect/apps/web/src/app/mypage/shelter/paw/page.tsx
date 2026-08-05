import Typography from "@/components/common/Typography";
import { PAGE_SIZE } from "@/constants/page.constants";
import { parsePageToNumber } from "@/utils/page.util";
import Pagination from "@/components/common/Pagination";
import styles from "@/styles/mypage/shelter/animalManage.module.css"
import NotFound from "@/components/common/NotFound";
import Empty from "@/components/common/Empty";
import Button from "@/components/common/Button";
import Link from "next/link";
import AnimalManageCard from "@/components/mypage/shelter/Animal-manage/AnimalManageCard";
import { GetShelterAnimals } from "@/services/shelters/get-shelter-animals.server";
import { PageProps } from "@/types/page.type";

// 보호동물 관리 페이지
export default async function Page({ searchParams }: PageProps) {
    // URL query parameter에서 페이지 정보 가져오기
    const { page } = await searchParams;
    // 현재 페이지 번호 변환
    const currentPage = parsePageToNumber(page);

    // 내 보호소 동물 목록 조회
    const response = await GetShelterAnimals(currentPage, PAGE_SIZE.MYPAGE.SHELTER.PAW);
    // 데이터 조회 실패 처리
    if (!response) {
        return <NotFound/>
    }

    const { animals, pagination } = response;
    const hasAnimals = (pagination?.totalCount && pagination?.totalCount > 0);

    return (
        <div className={styles.wrapper_page}>
            <div className={styles.wrapper_list}>
                <div className={styles.box_title}>
                    <Typography variant="title">보호동물 관리</Typography>
                    <Typography className={styles.typo_count}>총 {pagination?.totalCount}마리</Typography>
                </div>

                {/* 보호동물 등록 페이지 이동 */}
                <Link href="/mypage/shelter/paw/new">
                    <Button variant="secondary" fullWidth>새로운 보호동물 등록하기</Button>
                </Link>

                {hasAnimals ?
                    <div className={styles.box_list}>
                        {animals?.map((animal) =>
                            <AnimalManageCard key={animal.id} animal={animal}/>
                        )}
                    </div> :
                    <Empty className={styles.empty} text="등록된 동물이 없습니다"></Empty>
                }

                <div className={styles.pagination}>
                    <Pagination
                        page={pagination?.page}
                        maxPage={pagination?.totalPage}
                        path="/mypage/shelter/paw" />
                </div>
            </div>
        </div>
    );
}
