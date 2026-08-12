import { UPLOADER_MESSAGES } from "@/constants/messages/Uploader";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";

export interface ImagePreviewItem {
    url: string;
    isExisting: boolean; // 기존 이미지(서버 blobName)인지, 새로 선택한 파일인지
    name: string;
}

export function useImageUploader(
    errorText?: string,
    onChange?: (file: File | null, removed: boolean) => void,
    maxSizeMB = 5,
    disabled = false,
    initialImageUrl?: string, // 수정 화면의 기존 이미지 URL(blobName)
) {
    const [isDragging, setIsDragging] = useState(false);
    const [internalFile, setInternalFile] = useState<File | null>(null);
    const [previewItem, setPreviewItem] = useState<ImagePreviewItem | null>(
        initialImageUrl
            ? { url: initialImageUrl, isExisting: true, name: "기존 이미지" }
            : null
    );
    const [internalError, setInternalError] = useState<string | null>(null);
    const [removed, setRemoved] = useState(false); // 기존 이미지를 명시적으로 삭제했는지

    const inputRef = useRef<HTMLInputElement>(null);
    const currentUrlRef = useRef<string | null>(null); // 언마운트 시 정리를 위해 마지막으로 생성한 objectURL 추적

    const displayError = errorText || internalError;
    const isExistingImage = previewItem?.isExisting ?? false;

    // initialImageUrl이 비동기로(user 데이터 fetch 후) 늦게 들어오는 경우 대비
    useEffect(() => {
        if (initialImageUrl && !internalFile && !previewItem) {
            setPreviewItem({ url: initialImageUrl, isExisting: true, name: "기존 이미지" });
        }
        
    }, [initialImageUrl]);

    // 새 파일 선택 시에만 objectURL 생성 (파일이 바뀔 때만, 매 렌더마다 X)
    useEffect(() => {
        if (!internalFile) return;

        const url = URL.createObjectURL(internalFile);
        currentUrlRef.current = url;
        setPreviewItem({ url, isExisting: false, name: internalFile.name });

        return () => {
            URL.revokeObjectURL(url);
            if (currentUrlRef.current === url) currentUrlRef.current = null;
        };
    }, [internalFile]);

    useEffect(() => {
        if (!internalFile || !inputRef.current) return;

        const currentFiles = inputRef.current.files;
        if (!currentFiles || currentFiles.length === 0) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(internalFile);
            inputRef.current.files = dataTransfer.files;
        }
    }); // 불필요한 deps 배열 제거

    const validateAndSetFile = (file: File | null) => {
        if (!file) {
            const wasExisting = isExistingImage;

            setInternalFile(null);
            setInternalError(null);
            setPreviewItem(null);
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
        setInternalFile(file); // previewItem 갱신은 위 useEffect가 담당
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

    return { isDragging, inputRef, internalFile, previewItem, displayError, isExistingImage, removed,
        handleFileChange, handleDrop, handleDragOver, handleDragLeave, handleRemove
    };
}