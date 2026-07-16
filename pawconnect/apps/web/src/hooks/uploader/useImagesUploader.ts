import { UPLOADER_MESSAGES } from "@/constants/messages/Uploader";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";

export function useImagesUploader(
    errorText?: string,
    onChange?: (files: File[]) => void,
    maxSizeMB = 5,
    maxFiles = 5,
    disabled = false,
) {
    const [isDragging, setIsDragging] = useState(false);
    const [internalFiles, setInternalFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [internalError, setInternalError] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    const displayError = errorText || internalError;
    
    useEffect(() => {
        const urls = internalFiles.map((file) => URL.createObjectURL(file));
        setPreviewUrls(urls);

        return () => { urls.forEach((url) => URL.revokeObjectURL(url)) };
    }, [internalFiles]);

    const validateFiles = (files: File[]) => {
        if (internalFiles.length + files?.length > maxFiles) {
            setInternalError(maxFiles + UPLOADER_MESSAGES.default.error.not_count);
            return null;
        }

        for (const file of files) {
            if (!file.type.startsWith("image/")) {
                setInternalError(UPLOADER_MESSAGES.default.error.not_accept);
                return null;
            }

            if (file.size > maxSizeMB * 1024 * 1024) {
                setInternalError(maxSizeMB + UPLOADER_MESSAGES.default.error.not_size);
                return null;
            }
        }

        setInternalError(null);
        return files;
    };

    const addFile = (fileList: FileList | null) => {
        if (!fileList || fileList?.length === 0) return;

        const files = Array.from(fileList);
        const validated = validateFiles(files);
        if (!validated) return;

        const nextFiles = [...internalFiles, ...validated];
        setInternalFiles(nextFiles);
        onChange?.(nextFiles);
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        addFile(e.target.files);
        if (inputRef.current) inputRef.current.value = "";
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (disabled) return;

        addFile(e.dataTransfer.files);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleRemove = (index: number) => {
        if (inputRef.current) inputRef.current.value = "";
        const nextFiles = internalFiles.filter((_, i) => i !== index);
        setInternalFiles(nextFiles);
        setInternalError(null);
        onChange?.(nextFiles);
    };
    
    return { isDragging, inputRef, internalFiles, previewUrls, displayError,
        handleFileChange, handleDrop, handleDragOver, handleDragLeave, handleRemove
    };
}

