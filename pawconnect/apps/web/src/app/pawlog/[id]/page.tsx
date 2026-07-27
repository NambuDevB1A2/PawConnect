import { GetPawLogDetail } from "@/services/pawlog/get-pawlog-detail.server";
import { PageProps } from "@/types/page.type";
import styles from "@/styles/pawlog/pawlogDetail.module.css"
import Typography from "@/components/common/Typography";
import ImageSlider from "@/components/common/ImageSlider";
import Icon from "@/components/common/Icon";
import AppImage from "@/components/common/AppImage";
import { formatDateTime } from '../../../utils/format';

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const { pawLog } = await GetPawLogDetail(id);

    return (
        <div className={styles.wrapper_page}>
            <div className={styles.wrapper_detail}>
                <div className={styles.box_author}>
                    <AppImage className={styles.img_author_profile} src={pawLog?.author.imgProfile} />
                    <Typography variant="menutitle">{pawLog?.author.nickname}</Typography>
                </div>

                <div className={styles.box_content}>
                    <ImageSlider
                        wrapperClassName={styles.wrapper_image_slider}
                        size="large"
                        images={pawLog?.images.map((img) => img.img) ?? []} />
                    
                    <div className={styles.box_typo}>
                        <Typography className={styles.typo_title} variant="title">{pawLog?.title}</Typography>
                        <Typography className={styles.typo_at} variant="caption">{formatDateTime(pawLog?.updatedAt)}</Typography>
                        <Typography className={styles.typo_content}>{pawLog?.content}</Typography>
                    </div>

                    <div className={styles.box_pagination}>
                        <div className={styles.box_prev}>
                            <Icon name="arrow_left_alt"/>
                            <Typography>이전 페이지</Typography>
                        </div>

                        <div className={styles.box_next}>
                            <Typography>다음 페이지</Typography>
                            <Icon name="arrow_right_alt"/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}