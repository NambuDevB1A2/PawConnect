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
            <div className={styles.wrapper_detail}>
                <Typography variant="subtitle">{shelter?.shelter.name}</Typography>

                <div>
                    <ImageSlider 
                    images={shelter?.shelter.images.map((img) => img.img) ?? []} />
                </div>
                
            </div>
        </div>
    );
}