'use client';

import styles from "@/styles/uploader/ImageUploader.module.css"
import Typography from "@/components/common/Typography";
import Icon from "@/components/common/Icon";
import { useImagesUploader } from "@/hooks/uploader/useImagesUploader";
import { UPLOADER_MESSAGES } from "@/constants/messages/Uploader";
import PreviewImage from "@/components/uploader/PreviewImage";

export interface ImagesUploaderProps {
    name?: string;
    labelText?: string;
    helperText?: string;
    errorText?: string;
    onChange?: (files: File[]) => void;
    accept?: string;
    maxSizeMB?: number;
    maxFiles?: number;
    disabled?: boolean;
    wrapperClassName?: string;
}

export default function ImagesUploader({
    name,
    labelText,
    helperText = UPLOADER_MESSAGES.array.helper,
    errorText,
    onChange,
    accept = "image/png, image/jpeg, image/jpg",
    maxSizeMB = 5,
    maxFiles = 4,
    disabled = false,
    wrapperClassName = "",
}: ImagesUploaderProps) {
    const {isDragging, inputRef, internalFiles, previewUrls, displayError,
        handleFileChange, handleDrop, handleDragOver, handleDragLeave, handleRemove
     } = useImagesUploader(errorText, onChange, maxSizeMB, maxFiles, disabled);

    return (
        <span className={`${styles.wrapper_uploader} ${wrapperClassName}`}>
            {labelText && <Typography  variant="title">{labelText}</Typography>}

            {previewUrls.length > 0 && 
                <div className={styles.wrapper_preview}>
                    {previewUrls.map((url, index) => 
                        <PreviewImage
                            key={url}
                            previewUrl={url}
                            internalFileName={internalFiles[index]?.name}
                            onRemove={() => handleRemove(index)}/>)}
                </div>
            }

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
                        multiple
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