import NewPawLogForm from "@/components/pawlog/NewPawLogForm";
import styles from "@/styles/pawlog/newPawLog.module.css"

export default function Page() {
    return (
        <div className={styles.wrapper_new}>
            <NewPawLogForm/>
        </div>
    );
}