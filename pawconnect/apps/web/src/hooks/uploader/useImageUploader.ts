import { UPLOADER_MESSAGES } from "@/constants/messages/Uploader";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";

export function useImageUploader(
    errorText?: string,
    onChange?: (file: File | null) => void,
    maxSizeMB = 5,
    disabled = false,
) {
    const [isDragging, setIsDragging] = useState(false);
    const [internalFile, setInternalFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [internalError, setInternalError] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    const displayError = errorText || internalError;

    useEffect(() => {
        const url = internalFile ? URL.createObjectURL(internalFile) : null;
        setPreviewUrl(url);

        return () => { if (url) URL.revokeObjectURL(url) };
    }, [internalFile]);

    useEffect(() => {
        if (internalFile && inputRef.current?.files?.length === 0) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(internalFile);
            inputRef.current.files = dataTransfer.files;
        }
    });

    const validateAndSetFile = (file: File | null) => {
        if (!file) {
            setInternalFile(null);
            setInternalError(null);
            onChange?.(null);
            return true;
        }

        if (!file.type.startsWith("image/")) {
            setInternalError(UPLOADER_MESSAGES.default.error.not_accept);
            return false;
        }

        if (file.size > maxSizeMB * 1024 * 1024) {
            setInternalError(maxSizeMB + UPLOADER_MESSAGES.default.error.not_size);
            return false;
        }

        setInternalError(null);
        setInternalFile(file);
        onChange?.(file);
        return true;
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        const isValid = validateAndSetFile(file);
        if (!isValid && inputRef.current) inputRef.current.value = "";
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (disabled) return;

        const file = e.dataTransfer.files?.[0] ?? null;
        const isValid = validateAndSetFile(file);
        if (!file || !isValid) {
            if (!isValid && inputRef.current) inputRef.current.value = "";
            return;
        }

        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        if (inputRef.current) inputRef.current.files = dataTransfer.files;
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
    
    return { isDragging, inputRef, internalFile, previewUrl, displayError,
        handleFileChange, handleDrop, handleDragOver, handleDragLeave, handleRemove
    };
}

