import Icon from "@/components/common/Icon";
import Typography from "@/components/common/Typography";
import styles from "@/styles/common/NotFound.module.css"

interface EmptyProps {
    text: string;
}

export default function Empty({ text }: EmptyProps) {
    return (
        <div className={styles.wrapper_not_found}>
            <Icon className={styles.icon_warning} name="folder_off" size="hero"/>
            <Typography className={styles.typo_empty} variant="title">{text}</Typography>
        </div>
    );
}