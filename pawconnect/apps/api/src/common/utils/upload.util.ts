import { join, parse } from "path";
import { unlink } from 'fs/promises';
import { existsSync } from "fs";
import { AzureBlobService } from "@/azure/azure-blob/azure-blob.service";

// 파일 이름에서 아이디 추출 (Uuid)
export function getImageId(file: Express.Multer.File) {
    return parse(file.filename).name;
}

export function getImageIdByString(blobName: string) {
    return parse(blobName).name;
}

const IGNORE_IMAGES = [''];

// 파일 삭제
export async function removeFile(fileUrl: string) {
    if (!fileUrl || IGNORE_IMAGES.includes(fileUrl)) return;

    try {
        const filePath = join(
                process.cwd(),
                fileUrl.replace(/^\/+/, ''),
            );
        if (existsSync(filePath)) await unlink(filePath);
    } catch (error) {
        console.log(`fail to image delete:`, fileUrl, error);
    }
}

// 파일 여러 장 삭제
export async function removeFiles(fileUrls: string[]) {
    await Promise.all(fileUrls.map(removeFile));
}

// 업로드 도중 에러 발생시 업로드된 파일 삭제(고아 파일 방지)
export async function cleanupOnErrorByMulter<T>(files: Express.Multer.File[], callback: () => Promise<T>): Promise<T> {
    try {
        return await callback();
    } catch (error) {
        if (files.length > 0){
            // 파일 삭제
            await Promise.all(
                files.map(async (file) => {
                    try { 
                        if (existsSync(file.path)) await unlink(file.path);
                    } catch (error) {
                        console.log(`fail to image delete:`, file.path, error);
                    }
                }),
            );
        }

        throw error;
    }
}

export async function cleanupOnError<T>(azureBlob: AzureBlobService, blobNames: string[], fn: () => Promise<T>): Promise<T> {
    try {
        return await fn();
    } catch (error) {
        await Promise.allSettled(
            blobNames.map((blobName) => azureBlob.deleteBlob(blobName)),
        );
        throw error; // 원래 에러는 그대로 위로 전달
    }
}