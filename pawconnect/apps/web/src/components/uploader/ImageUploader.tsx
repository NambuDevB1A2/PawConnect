'use client';

import styles from "@/styles/uploader/ImageUploader.module.css"
import Typography from "@/components/common/Typography";
import Icon from "@/components/common/Icon";
import { useImageUploader } from "@/hooks/uploader/useImageUploader";
import { UPLOADER_MESSAGES } from "@/constants/messages/Uploader";
import PreviewImage from "@/components/uploader/PreviewImage";

export interface ImageUploaderProps {
    name?: string;
    labelText?: string;
    helperText?: string;
    errorText?: string;
    onChange?: (file: File | null) => void;
    accept?: string;
    maxSizeMB?: number;
    disabled?: boolean;
    initialImageUrl?: string;
    removedFieldName?: string;
    wrapperClassName?: string;
    previewClassName?: string;
    previewBoxClassName?: string;
    previewImageClassName?: string;
}

export default function ImageUploader({
    name,
    labelText,
    helperText = UPLOADER_MESSAGES.default.helper,
    errorText,
    onChange,
    accept = "image/png, image/jpeg, image/jpg",
    maxSizeMB = 5,
    disabled = false,
    initialImageUrl,
    removedFieldName,
    wrapperClassName = "",
    previewClassName = "",
    previewBoxClassName = "",
    previewImageClassName = "",
}: ImageUploaderProps) {
    const {isDragging, inputRef, internalFile, previewItem, displayError, removed, isExistingImage,
        handleFileChange, handleDrop, handleDragOver, handleDragLeave, handleRemove
     } = useImageUploader(errorText, onChange, maxSizeMB, disabled, initialImageUrl);

    return (
        <span className={`${styles.wrapper_uploader} ${wrapperClassName}`}>
            {labelText && <Typography  variant="title">{labelText}</Typography>}

            <input
                type="hidden"
                name={removedFieldName ?? `${name}Removed`}
                value={String(removed)}
                />

            {previewItem && 
                <PreviewImage
                    previewUrl={previewItem.url}
                    internalFileName={previewItem.name}
                    previewClassName={previewClassName}
                    previewBoxClassName={previewBoxClassName}
                    previewImageClassName={previewImageClassName}
                    onRemove={handleRemove}
                    disabledDomain={!previewItem.isExisting} // 기존 이미지면 도메인 붙이고(false), 새 파일이면 그대로(true)
                    />}

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

        </span>
    );
}