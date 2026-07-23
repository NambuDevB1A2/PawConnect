import InfoForm from "@/components/mypage/InfoForm";
import { Me } from "@/services/auth/me.server";
import styles from "@/styles/mypage/info.module.css"

export default async function Info() {
    const user = await Me();

    return (
        <div className={styles.wrapper_info}>
            <InfoForm user={user}/>
        </div>
    );
}