import RegisterRole from "@/components/auth/RegisterRole";
import Typography from "@/components/common/Typography";
import styles from "@/styles/auth/register.module.css"

export default function Page() {
    return (
        <div className={styles.wrapper_register}>
            <Typography variant="heading">회원가입</Typography>
            <RegisterRole/>
        </div>
    );
}