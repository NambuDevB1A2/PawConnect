import { UPLOADER_MESSAGES } from "@/constants/messages/Uploader";
import { ImagePreviewItem } from "@/hooks/uploader/useImageUploader";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";

interface ManagedFile {
    id: string;
    file: File;
    url: string; // 생성 시점에 한 번만 발급, 이후 재사용
}

function makeId() {
    return typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`;
}

function fileSignature(file: File) {
    // 같은 파일이 중복 추가되는 걸 막기 위한 식별자
    return `${file.name}_${file.size}_${file.lastModified}`;
}

export function useImagesUploader(
    errorText?: string,
    onChange?: (files: File[], keepUrls: string[]) => void,
    maxSizeMB = 5,
    maxFiles = 4,
    disabled = false,
    initialImageUrls: string[] = [],
) {
    const [isDragging, setIsDragging] = useState(false);
    const [managedFiles, setManagedFiles] = useState<ManagedFile[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>(initialImageUrls);
    const [internalError, setInternalError] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const isSyncingRef = useRef(false);
    const managedFilesRef = useRef<ManagedFile[]>([]); // 언마운트 시 최신 목록 참조용

    const displayError = errorText || internalError;

    useEffect(() => {
        managedFilesRef.current = managedFiles;
    }, [managedFiles]);

    useEffect(() => {
        if (initialImageUrls.length > 0 && managedFiles.length === 0 && existingImages.length === 0) {
            setExistingImages(initialImageUrls);
        }
        
    }, [initialImageUrls]);

    // 언마운트 시에만 남아있는 모든 url 정리 (개별 파일 url은 각자 생성/삭제 시점에 관리)
    useEffect(() => {
        return () => {
            managedFilesRef.current.forEach((m) => URL.revokeObjectURL(m.url));
        };
    }, []);

    useEffect(() => {
        if (managedFiles.length === 0 || !inputRef.current) return;

        const currentFiles = inputRef.current.files;
        if (!currentFiles || currentFiles.length !== managedFiles.length) {
            syncInputFiles(managedFiles.map((m) => m.file));
        }
    }); // 불필요한 deps 배열 제거

    const previewItems: ImagePreviewItem[] = [
        ...existingImages.map((url) => ({ url, isExisting: true, name: "기존 이미지" })),
        ...managedFiles.map((m) => ({ url: m.url, isExisting: false, name: m.file.name })),
    ];

    const totalCount = existingImages.length + managedFiles.length;

    const syncInputFiles = (files: File[]) => {
        if (!inputRef.current) return;
        const dataTransfer = new DataTransfer();
        files.forEach((file) => dataTransfer.items.add(file));
        isSyncingRef.current = true;
        inputRef.current.files = dataTransfer.files;
    }

    const emitChange = (managed: ManagedFile[], keeps: string[]) => {
        onChange?.(managed.map((m) => m.file), keeps);
    };

    const validateFiles = (files: File[], currentCount: number) => {
        if (currentCount + files.length > maxFiles) {
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
        if (!fileList || fileList.length === 0) return;

        const incoming = Array.from(fileList);

        // 이미 추가된 파일과 동일한 파일(재발생 change 등으로 인한 중복)은 걸러냄
        const existingSignatures = new Set(managedFiles.map((m) => fileSignature(m.file)));
        const deduped = incoming.filter((f) => !existingSignatures.has(fileSignature(f)));

        if (deduped.length === 0) {
            syncInputFiles(managedFiles.map((m) => m.file));
            return;
        }

        const validated = validateFiles(deduped, totalCount);
        if (!validated) {
            syncInputFiles(managedFiles.map((m) => m.file));
            return;
        }

        const newEntries: ManagedFile[] = validated.map((file) => ({
            id: makeId(),
            file,
            url: URL.createObjectURL(file), // 이 파일에 대해 딱 한 번만 생성
        }));

        const nextManaged = [...managedFiles, ...newEntries];
        setManagedFiles(nextManaged);
        syncInputFiles(nextManaged.map((m) => m.file));
        emitChange(nextManaged, existingImages);
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (isSyncingRef.current) {
            isSyncingRef.current = false;
            return;
        }
        addFile(e.target.files);
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
        if (index < existingImages.length) {
            const nextExisting = existingImages.filter((_, i) => i !== index);
            setExistingImages(nextExisting);
            setInternalError(null);
            emitChange(managedFiles, nextExisting);
            return;
        }

        const fileIndex = index - existingImages.length;
        const removed = managedFiles[fileIndex];
        if (removed) URL.revokeObjectURL(removed.url); // 제거되는 파일의 url만 정확히 revoke

        const nextManaged = managedFiles.filter((_, i) => i !== fileIndex);
        setManagedFiles(nextManaged);
        syncInputFiles(nextManaged.map((m) => m.file));
        setInternalError(null);
        emitChange(nextManaged, existingImages);
    };

    return {
        isDragging,
        inputRef,
        internalFiles: managedFiles.map((m) => m.file), // 기존 사용처와의 호환을 위해 그대로 노출
        previewItems,
        existingImages,
        displayError,
        handleFileChange, handleDrop, handleDragOver, handleDragLeave, handleRemove
    };
}