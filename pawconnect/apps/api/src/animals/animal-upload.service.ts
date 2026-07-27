import { AzureBlobService } from "@/azure/azure-blob/azure-blob.service";
import { UPLOAD_DIR } from "@/config/upload.config";
import { BadRequestException, Injectable } from "@nestjs/common";


@Injectable()
export class AnimalUploadService {
    constructor(private readonly azureBlob: AzureBlobService) { }

    // 썸네일 이미지 업로드
    async uploadThumbnail(file: Express.Multer.File) {
        if (!file) throw new BadRequestException("썸네일은 필수입니다");

        return this.azureBlob.uploadPublic(
            file,
            UPLOAD_DIR.animalThumbnailDir
        );
    }

    // 동물 이미지들 업로드
    async uploadImages(files: Express.Multer.File[]) {
        // 이미지 없으면 예외처리(최소1장 이상)
        if (!files || files.length === 0) {
            throw new BadRequestException("동물 이미지는 필수 1장이상입니다");
        }
        if (files.length > 4) {
            throw new BadRequestException("동물 이미지는 4장까지 등록가능합니다");
        }
        // 애저 blob 스토리지에 이미지 업로드
        return this.azureBlob.uploadPublicMultiple(
            files,
            UPLOAD_DIR.animalImgDir,
        );
    }

    // DB 작업 실패 시 업로드한 Blob 파일 삭제
    async rollback(
        thumbnail?: {blobName: string}, 
        images?: {blobName: string}[]
    ) {
        // 썸네일 삭제
        if (thumbnail) {
            await this.azureBlob.deleteBlob(thumbnail.blobName);
        }

        // 상세 이미지들 삭제
        if (images?.length) {
            await Promise.all(
                images.map(img => this.azureBlob.deleteBlob(img.blobName))
            );
        }
    }

    // Blob 이미지 삭제
    async deleteBlob(blobName: string){
        if(!blobName) return;
        await this.azureBlob.deleteBlob(blobName);
    }

    // Blob 이미지 일괄 삭제
    async deleteBlobs(blobNames: string[]){
        if(!blobNames?.length) return;
        await Promise.all(
            blobNames.map(blob => this.azureBlob.deleteBlob(blob))
        );
    }
}