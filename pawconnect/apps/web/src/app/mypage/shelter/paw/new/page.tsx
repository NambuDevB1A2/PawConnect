import AnimalForm from "@/components/mypage/shelter/Animal-manage/AnimalForm";
import styles from "@/styles/mypage/shelter/animalForm.module.css";

// 보호동물 등록페이지
export default function Page() {
    return (
        <div className={styles.wrapper_new}>
            <AnimalForm mode="create" />
        </div>
    );
}
