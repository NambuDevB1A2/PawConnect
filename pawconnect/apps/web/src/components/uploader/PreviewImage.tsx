import IconButton from "@/components/common/IconButton";
import Typography from "@/components/common/Typography";
import styles from "@/styles/uploader/PreviewImage.module.css"

interface PreviewImageProps {
    previewUrl: string;
    internalFileName: string;
    onRemove?: () => void;
    previewBoxClassName?: string;
    previewImageClassName?: string;
}

export default function PreviewImage({
    previewUrl,
    internalFileName,
    onRemove,
    previewBoxClassName = "",
    previewImageClassName = "",
}: PreviewImageProps) {
    return (
        <div className={styles.box_preview}>
            <div className={`${styles.box_upper} ${previewBoxClassName}`}>
                <Typography 
                    className={styles.preview_text} 
                    variant="body1"
                    >{internalFileName}</Typography>
                <IconButton 
                    wrapperClassName={styles.btn_remove}
                    name="close" 
                    size="input"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove?.();
                    }}/>
            </div> 
            <div className={styles.box_image}>
                <img className={`${styles.img_preview} ${previewImageClassName}`} src={previewUrl}/>
            </div>
        </div>
    );
}