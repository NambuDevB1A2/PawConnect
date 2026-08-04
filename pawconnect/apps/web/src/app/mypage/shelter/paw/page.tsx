import Typography from "@/components/common/Typography";
import { PAGE_SIZE } from "@/constants/page.constants";
import { getAnimals } from "@/services/paw/get-animals.server";
import { parsePageToNumber } from "@/utils/page.util";
import Pagination from "@/components/common/Pagination";
import styles from "@/styles/mypage/shelter/animalManage.module.css"
import NotFound from "@/components/common/NotFound";
import Empty from "@/components/common/Empty";
import Button from "@/components/common/Button";
import { GetMyShelter } from "@/services/shelters/get-my-shelter.server";
import Link from "next/link";
import AnimalManageCard from "@/components/mypage/shelter/Animal-manage/AnimalManageCard";


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

    // 내보호소
    const shelterResponse = await GetMyShelter();
    if (!shelterResponse) return <NotFound />
    const shelter = shelterResponse.shelter
    if (!shelter) return <NotFound />

    // 보호동물, 페이지네이션
    const animalResponse = await getAnimals(currentPage, PAGE_SIZE.ANIMAL);
    if (!animalResponse) return <NotFound />;

    const pagination = animalResponse.pagination;

    // 로그인한 보호소의 동물
    const myAnimals = animalResponse.animals.filter(
        animal => animal.shelterId === shelter.id);

    return (
        <div className={styles.wrapper_page}>
            <div className={styles.wrapper_list}>
                <div className={styles.box_title}>
                    <Typography variant="title">보호동물 관리</Typography>
                    <Typography className={styles.typo_count}>총 {myAnimals.length}마리</Typography>
                </div>

                {/* 등록버튼 */}
                <Link href="/mypage/shelter/paw/new">
                    <Button variant="secondary" fullWidth>새로운 보호동물 등록하기</Button>
                </Link>

                {/* 보호동물 목록 구간 */}
                {myAnimals.length === 0 ? (<Empty className={styles.empty} text="등록된 동물이 없습니다" />) :
                    <div className={styles.animalGrid}>
                        {myAnimals.map((animal) => (
                            <AnimalManageCard key={animal.id} animal={animal} />
                        ))}
                    </div>
                }

                {/* 페이지네이션 구간 */}
                <div className={styles.pagination}>
                    <Pagination page={pagination.page}
                        maxPage={pagination.totalPage}
                        path="/mypage/shelter/paw" />
                </div>
            </div>
        </div>
    );
}
