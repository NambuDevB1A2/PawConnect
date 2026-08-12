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
    onChange?: (files: File[], keepUrls: string[]) => void;
    accept?: string;
    maxSizeMB?: number;
    maxFiles?: number;
    disabled?: boolean;
    wrapperClassName?: string;
    initialImageUrls?: string[]; // 추가: 수정 시 기존 이미지 blobName 목록
    keepFieldName?: string;      // 유지 목록 hidden input의 name (기본: `${name}Keeps`)
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
    initialImageUrls = [],
    keepFieldName,
}: ImagesUploaderProps) {
    const {isDragging, inputRef, previewItems, existingImages, displayError,
        handleFileChange, handleDrop, handleDragOver, handleDragLeave, handleRemove
     } = useImagesUploader(errorText, onChange, maxSizeMB, maxFiles, disabled, initialImageUrls);

    return (
        <span className={`${styles.wrapper_uploader} ${wrapperClassName}`}>
            {labelText && <Typography variant="title">{labelText}</Typography>}

            {/* 유지할 기존 이미지 목록을 폼 제출 시 함께 보내기 위한 hidden input (쉼표 join) */}
            <input
                type="hidden"
                name={keepFieldName ?? `${name}Keeps`}
                value={existingImages.join(',')}
            />

            {previewItems.length > 0 && 
                <div className={styles.wrapper_preview}>
                    {previewItems.map((item, index) => 
                        <PreviewImage
                            key={item.isExisting ? `existing-${item.url}` : `new-${item.url}`}
                            previewUrl={item.url}
                            internalFileName={item.name}
                            disabledDomain={!item.isExisting} // 기존 이미지는 도메인 붙이고, 새 파일은 blob URL 그대로
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