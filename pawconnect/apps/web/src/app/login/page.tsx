import styles from "@/styles/auth/login.module.css"
import Section from "@/components/common/Section";
import LoginForm from "@/components/auth/LoginForm";

export default async function Page() {
    return (
        <div className={styles.wrapper_login}>
            <Section size="medium">
                <LoginForm/>
            </Section>
        </div>
    );
}