import PawLogCard from "@/components/card/PawLogCard";
import Pagination from "@/components/common/Pagination";
import Typography from "@/components/common/Typography";
import { GetPetPosts } from "@/services/pawlog/get-petpots.server";
import styles from "@/styles/pawlog/pawlog.module.css"
import { PageProps } from "@/types/page.type";

export default async function Page({ searchParams }: PageProps) {
    const { page } = await searchParams;
    const petPosts = await GetPetPosts(Number(page ?? 1), 5);

    return (
        <div className={styles.wrapper_page}>
            <div className={styles.wrapper_list}>
                <div className={styles.box_title}>
                    <Typography variant="heading">PawLog 목록</Typography>
                    <Typography>총 {petPosts?.pagination?.total}개의 게시글</Typography>
                </div>

                <div className={styles.box_list}>
                    {petPosts?.petPosts?.map((petPost) =>
                        <PawLogCard key={petPost.id} petPost={petPost}/>
                    )}
                </div>

                <div className={styles.pagination}>
                    <Pagination
                        page={petPosts?.pagination?.page} 
                        maxPage={petPosts?.pagination?.totalPage}
                        path="/pawlog" />
                </div>
            </div>
        </div>
    );
}