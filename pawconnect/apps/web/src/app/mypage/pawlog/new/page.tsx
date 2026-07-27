import NewPawLogForm from "@/components/mypage/pawlog/NewPawLogForm";
import styles from "@/styles/mypage/pawlog/newPawLog.module.css"

export default function Page() {
    return (
        <div className={styles.wrapper_new}>
            <NewPawLogForm/>
        </div>
    );
}