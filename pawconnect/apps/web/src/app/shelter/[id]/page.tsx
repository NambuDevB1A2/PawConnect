import AppImage from "@/components/common/AppImage";
import ImageSlider from "@/components/common/ImageSlider";
import Typography from "@/components/common/Typography";
import { GetShelterDetail } from "@/services/shelters/get-shelter-detail.server";
import styles from "@/styles/shelter/shelterDetail.module.css"
import { PageProps } from "@/types/page.type";

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const shelter = await GetShelterDetail(id);

    return (
        <div className={styles.wrapper_page}>
            <div className={styles.box_banner}>
                <AppImage className={styles.img_banner} src={shelter?.shelter.imgBanner} />
            </div>

            <div className={styles.wrapper_detail}>
                <div className={styles.box_name}>
                    <Typography variant="heading">{shelter?.shelter.name}</Typography>
                </div>

                <div className={styles.box_content}>
                    <ImageSlider
                        wrapperClassName={styles.wrapper_image_slider}
                        size="small"
                        images={shelter?.shelter.images.map((img) => img.img) ?? []} />
                    
                    <div className={styles.box_info}>
                        <div className={styles.box_typo}>
                            <Typography className={styles.typo_subtitle} weight="semibold">주소</Typography>
                            <Typography className={styles.typo_content}>{shelter?.shelter.address} {shelter?.shelter.addressDetail}</Typography>
                        </div>

                        <div className={styles.box_typo}>
                            <Typography className={styles.typo_subtitle} weight="semibold">전화번호</Typography>
                            <Typography className={styles.typo_content}>{shelter?.shelter.phone}</Typography>
                        </div>

                        <div className={styles.box_typo}>
                            <Typography className={styles.typo_subtitle} weight="semibold">운영시간</Typography>
                            <Typography className={styles.typo_content}>{shelter?.shelter.operatingHours}</Typography>
                        </div>
                        
                        <div className={styles.box_typo}>
                            <Typography className={styles.typo_subtitle} weight="semibold">소개말</Typography>
                            <Typography className={styles.typo_content}>{shelter?.shelter.description}</Typography>
                        </div>
                    </div>
                </div>

                {/* TODO: 보유 보호동물 추가 */}
                
            </div>
        </div>
    );
}