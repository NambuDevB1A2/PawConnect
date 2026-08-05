import AppImage from "@/components/common/AppImage";
import Empty from "@/components/common/Empty";
import ImageSlider from "@/components/common/ImageSlider";
import NotFound from "@/components/common/NotFound";
import Typography from "@/components/common/Typography";
import AnimalCard from "@/components/paw/AnimalCard";
import MyShelterOptions from "@/components/shelter/MyShelterOptions";
import ShelterAnimalTitleButton from "@/components/shelter/ShelterAnimalTitleButton";
import { GetShelterDetail } from "@/services/shelters/get-shelter-detail.server";
import styles from "@/styles/shelter/shelterDetail.module.css"
import { PageProps } from "@/types/page.type";
import { formatPhoneNumber } from "@/utils/format.util";

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const response = await GetShelterDetail(id);

    if (!response) {
        return <NotFound/>
    }

    const { shelter, animals } = response;
    const hasAnimals = animals && animals.length > 0;

    return (
        <div className={styles.wrapper_page}>
            <div className={styles.box_banner}>
                <AppImage className={styles.img_banner} src={shelter?.imgBanner} />
            </div>

            <div className={styles.wrapper_detail}>
                <div className={styles.box_name}>
                    <Typography variant="heading">{shelter?.name}</Typography>
                    <MyShelterOptions shelter={shelter}/>
                </div>

                <div className={styles.box_content}>
                    <ImageSlider
                        wrapperClassName={styles.wrapper_image_slider}
                        size="large"
                        images={shelter?.images.map((img) => img.img) ?? []} />
                    
                    <div className={styles.box_info}>
                        <div className={styles.box_typo}>
                            <Typography className={styles.typo_subtitle} weight="semibold">주소</Typography>
                            <Typography className={styles.typo_content}>{shelter?.address} {shelter?.addressDetail}</Typography>
                        </div>

                        <div className={styles.box_typo}>
                            <Typography className={styles.typo_subtitle} weight="semibold">전화번호</Typography>
                            <Typography className={styles.typo_content}>{formatPhoneNumber(shelter?.phone)}</Typography>
                        </div>

                        <div className={styles.box_typo}>
                            <Typography className={styles.typo_subtitle} weight="semibold">운영시간</Typography>
                            <Typography className={styles.typo_content}>{shelter?.operatingHours}</Typography>
                        </div>
                        
                        <div className={styles.box_typo}>
                            <Typography className={styles.typo_subtitle} weight="semibold">소개말</Typography>
                            <Typography className={styles.typo_content}>{shelter?.description}</Typography>
                        </div>
                    </div>
                </div>

                <ShelterAnimalTitleButton shelterName={shelter?.name}/>

                <div className={styles.box_animals}>
                    {hasAnimals ?
                        animals.map((animal) => <AnimalCard key={animal.id} animal={animal}/>) :
                        <Empty className={styles.empty} text="등록된 동물이 없습니다"/>
                    }
                </div>
                
            </div>
        </div>
    );
}