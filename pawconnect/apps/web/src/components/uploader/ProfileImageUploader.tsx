'use client';

import styles from "@/styles/uploader/ProfileImageUploader.module.css"
import Typography from "@/components/common/Typography";
import Icon from "@/components/common/Icon";
import { useImageUploader } from "@/hooks/uploader/useImageUploader";
import { UPLOADER_MESSAGES } from "@/constants/messages/Uploader";
import Button from "@/components/common/Button";
import { ImageUploaderProps } from "@/components/uploader/ImageUploader";
import AppImage from "@/components/common/AppImage";

interface ProfileImageUploaderProps extends ImageUploaderProps {
}

export default function ProfileImageUploader({
    name,
    labelText,
    helperText = UPLOADER_MESSAGES.profile.helper,
    errorText,
    onChange,
    accept = "image/png, image/jpeg, image/jpg",
    maxSizeMB = 5,
    disabled = false,
    initialImageUrl,
    removedFieldName,
    wrapperClassName = "",
}: ProfileImageUploaderProps) {
    const {isDragging, inputRef, internalFile, previewItem, displayError, removed, isExistingImage,
        handleFileChange, handleDrop, handleDragOver, handleDragLeave, handleRemove
     } = useImageUploader(errorText, onChange, maxSizeMB, disabled, initialImageUrl);

    return (
        <span className={`${styles.wrapper_uploader} ${wrapperClassName}`}>
            {labelText && <Typography variant="subtitle">{labelText}</Typography>}
        
            <input
                type="hidden"
                name={removedFieldName ?? `${name}Removed`}
                value={String(removed)}
                />

            <div className={styles.box_uploader}>
                <div className={styles.box_image}>
                    {previewItem ?
                    <AppImage
                        className={styles.img_preview}
                        src={previewItem.url}
                        disabledDomain={!previewItem.isExisting} // 기존 이미지면 도메인 붙이고(false), 새 파일이면 그대로(true)
                    /> :
                    <div className={styles.box_null}>
                        <Icon name="account_circle" size="hero" color="color_default"/>
                    </div>}
                </div>

                {previewItem && 
                    <Button
                        className={styles.btn_remove}
                        size="small"
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRemove();
                        }}>이미지 제거</Button>}

                <div 
                    className={`${styles.dropzone}
                    ${isDragging ? styles.dropzone_dragging : ""}
                    ${displayError ? styles.dropzone_error : ""}
                    ${disabled ? styles.dropzone_disabled : ""}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    >
                        <input
                            ref={inputRef}
                            type="file"
                            name={name}
                            accept={accept}
                            disabled={disabled}
                            onChange={handleFileChange}
                            className={`${styles.input}`}
                        />
                    
                    <div className={styles.box_text}>
                        <Icon name="upload" color="color_default" />
                        {helperText && <Typography className={styles.helper_text}>{helperText}</Typography>}
                        {displayError && <Typography className={styles.error_text}>{displayError}</Typography>}
                    </div>
                </div>
            </div>
        </span>
    );
}