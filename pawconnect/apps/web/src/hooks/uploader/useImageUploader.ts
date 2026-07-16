import { UPLOADER_MESSAGES } from "@/constants/messages/Uploader";
import { ChangeEvent, DragEvent, useRef, useState } from "react";

export function useImageUploader(
    errorText?: string,
    onChange?: (file: File | null) => void,
    maxSizeMB = 5,
    disabled = false,
) {
    const [isDragging, setIsDragging] = useState(false);
    const [internalFile, setInternalFile] = useState<File | null>(null);
    const [internalError, setInternalError] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    const previewUrl = internalFile ? URL.createObjectURL(internalFile) : null;
    const displayError = errorText || internalError;

    const validateAndSetFile = (file: File | null) => {
        if (!file) {
            setInternalFile (null);
            setInternalError(null);
            onChange?.(null);
            return;
        }

        if (!file.type.startsWith("image/")) {
            setInternalError(UPLOADER_MESSAGES.default.error.not_accept);
            return;
        }

        if (file.size > maxSizeMB * 1024 * 1024) {
            setInternalError(maxSizeMB + UPLOADER_MESSAGES.default.error.not_size);
            return;
        }

        setInternalError(null);
        setInternalFile(file);
        onChange?.(file);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        validateAndSetFile(file);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (disabled) return;

        const file = e.dataTransfer.files?.[0] ?? null;
        validateAndSetFile(file);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleRemove = () => {
        if (inputRef.current) inputRef.current.value = "";
        validateAndSetFile(null);
    };
    
    return {isDragging, inputRef, internalFile, previewUrl, displayError,
        handleFileChange, handleDrop, handleDragOver, handleDragLeave, handleRemove
    };
}