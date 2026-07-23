import { UPLOADER_MESSAGES } from "@/constants/messages/Uploader";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";

export function useImageUploader(
    errorText?: string,
    onChange?: (file: File | null, removed: boolean) => void, // 시그니처 변경
    maxSizeMB = 5,
    disabled = false,
    initialImageUrl?: string, // 추가: 수정 화면의 기존 이미지 URL
) {
    const [isDragging, setIsDragging] = useState(false);
    const [internalFile, setInternalFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl ?? null);
    const [internalError, setInternalError] = useState<string | null>(null);
    const [isExistingImage, setIsExistingImage] = useState(!!initialImageUrl);
    const [removed, setRemoved] = useState(false); // 기존 이미지를 명시적으로 삭제했는지

    const inputRef = useRef<HTMLInputElement>(null);

    const displayError = errorText || internalError;

    // initialImageUrl이 비동기로(user 데이터 fetch 후) 늦게 들어오는 경우 대비
    useEffect(() => {
        if (initialImageUrl && !internalFile) {
            setPreviewUrl(initialImageUrl);
            setIsExistingImage(true);
        }
    }, [initialImageUrl]);

    // 새 파일 선택 시에만 objectURL 생성
    useEffect(() => {
        if (!internalFile) return;
        const url = URL.createObjectURL(internalFile);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [internalFile]);

    const validateAndSetFile = (file: File | null) => {
        if (!file) {
            const wasExisting = isExistingImage;

            setInternalFile(null);
            setInternalError(null);
            setPreviewUrl(null);
            setIsExistingImage(false);
            setRemoved(wasExisting); // 기존 이미지가 있었을 때만 "삭제"로 취급

            onChange?.(null, wasExisting);
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
        setIsExistingImage(false);
        setRemoved(false); // 새 파일로 교체 -> 삭제 상태 아님
        onChange?.(file, false);
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

    return { isDragging, inputRef, internalFile, previewUrl, displayError, isExistingImage, removed,
        handleFileChange, handleDrop, handleDragOver, handleDragLeave, handleRemove
    };
}