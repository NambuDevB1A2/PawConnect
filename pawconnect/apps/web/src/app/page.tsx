import BannerSlider from "@/components/common/BannerSlider";
import Button from "@/components/common/Button";
import Empty from "@/components/common/Empty";
import Typography from "@/components/common/Typography";
import HomeTitleButton from "@/components/home/HomeTitleButton";
import AnimalCard from "@/components/paw/AnimalCard";
import ShelterCard from "@/components/shelter/ShelterCard";
import { Home } from "@/services/home/home.server";
import styles from "@/styles/home/home.module.css"

export default async function Page() {
    const response = await Home();

    if (!response) {
        return null;
    }

    const { animals, shelter } = response;

    return (
        <div className={styles.wrapper_page}>
            <BannerSlider
                slides={[
                    {
                        id: 1,
                        backgroundImage: 'home/banner/banner_01.png',
                        title: '새로운 가족을 찾는\n가장 따뜻한 방법',
                        description: 'PawConnect는 보호소와 예비 보호자를 연결하고, 더 행복한 반려 생활을 만들어 갑니다.',
                        buttons: [
                            {
                                id: 1,
                                label: "보호동물 보러가기",
                                path: "/paw",
                            },
                            {
                                id: 2,
                                label: "보호소 찾아가기",
                                path: "/shelter",
                            }
                        ]
                    },
                    {
                        id: 2,
                        backgroundImage: 'home/banner/banner_02.png',
                        title: '나의 가족을 소개해보세요',
                        description: 'PawConnect는 일상을 기록하고 다양한 사람들과 이야기를 공유할 수 있습니다.',
                        buttons: [
                            {
                                id: 1,
                                variant: "secondary",
                                label: "게시글 보러가기",
                                path: "/pawlog",
                            },
                        ]
                    },
                    {
                        id: 3,
                        backgroundImage: 'home/banner/banner_03.png',
                        title: '나와 잘 맞는\n반려동물을 찾아보세요',
                        description: 'PawConnect는 AI 성향 테스트로 당신의 성격과 생활 방식에 맞는 반려동물을 추천해드립니다.',
                        buttons: [
                            {
                                id: 1,
                                variant: "outline",
                                label: "성향테스트 하러가기",
                                path: "/pawlab",
                            },
                        ]
                    },
                ]}
            />

            <div className={styles.wrapper_card}>
                <div className={styles.box_animal}>
                    <HomeTitleButton titleText="최신 등록 보호동물" path="/paw"/>
                    <div className={styles.box_animal_list}>
                        {animals.length > 0 ?
                            animals.map((animal) =>
                                <AnimalCard key={animal.id} animal={animal} />
                            ) :
                            <Empty text="등록된 보호소가 없습니다"/>}
                    </div>
                </div>
                
                <div className={styles.box_shelter}>
                    <HomeTitleButton titleText="신규 보호소" path="/shelter"/>
                    <div className={styles.box_shelter_card}>
                        {shelter ?
                            <ShelterCard shelter={shelter} wrapperClassName={styles.shelter_card_full}/> :
                            <Empty text="등록된 보호소가 없습니다"/>}
                    </div>
                </div>
            </div>
        </div>
    );
}
