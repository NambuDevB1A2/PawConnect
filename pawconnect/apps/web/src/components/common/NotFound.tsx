import Icon from "@/components/common/Icon";
import Typography from "@/components/common/Typography";
import styles from "@/styles/common/NotFound.module.css"

export default function NotFound() {
    return (
        <div className={styles.wrapper_not_found}>
            <Icon className={styles.icon_warning} name="warning" color="error" size="hero"/>
            <Typography className={styles.typo_warning} variant="title">접근할 수 없습니다</Typography>
        </div>
    );
}