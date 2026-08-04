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

// 보호동물 관리 페이지
export default async function Page({ searchParams }: PageProps) {

    // URL query parameter에서 페이지 정보 가져오기
    const params = await searchParams;
    // 현재 페이지 번호 변환
    const currentPage = parsePageToNumber(params?.page);

    // 내 보호소 동물 목록 조회
    const animalResponse = await GetShelterAnimals(currentPage, PAGE_SIZE.ANIMAL);
    // 데이터 조회 실패 처리
    if (!animalResponse) return <NotFound />;

    // 페이지네이션 데이터
    const pagination = animalResponse.pagination;

    // 조회된 보호동물 목록
    const myAnimals = animalResponse.animals;

    return (
        <div className={styles.wrapper_list}>
            <div className={styles.box_title}>
                <Typography variant="heading">보호동물 관리</Typography>
                 {/* 보호동물 등록 페이지 이동 */}
                <Link href="/mypage/shelter/paw/new">
                    <Button variant="secondary" size="small">등록</Button>
                </Link>
            </div>

            <div className={styles.content}>
                <div className={styles.list_section}>

                    {/* 보호동물 목록 */}
                    <div className={styles.animalGrid}>
                        {/* 등록된 동물이 없으면 빈 상태 표시 */}
                        {myAnimals.length === 0 ? (<Empty text="등록된 동물이 없습니다" />) :
                            (
                                 // 보호동물 카드 목록 출력
                                myAnimals.map((animal) => (
                                <AnimalManageCard key={animal.id} animal={animal} />
                            ))
                            )}
                    </div>

                    {/* 페이지 이동 영역 */}
                    <div className={styles.pagination}>
                        <Pagination page={pagination.page}
                            maxPage={pagination.totalPage}
                            path="/mypage/shelter/paw" />
                    </div>
                </div>
            </div>
        </div>
    );
}