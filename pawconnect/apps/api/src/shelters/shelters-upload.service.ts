import { AzureBlobService } from '@/azure/azure-blob/azure-blob.service';
import { UPLOAD_DIR } from '@/config/upload.config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SheltersUploadService {
    constructor (
        private readonly azureBlob: AzureBlobService,
    ) {}

    // 이미지 업로드 (배너)
    async uploadBanner(file: Express.Multer.File) {
        if (!file) return;

        const uploaded = await this.azureBlob.uploadPublic(
            file,
            UPLOAD_DIR.shelterBannerDir,
        );

        return uploaded.blobName;
    }

    // 이미지 업로드 (여러 장)
    async uploadImages(files: Express.Multer.File[]) {
        if (!files || files.length === 0) return;

        const uploaded = await this.azureBlob.uploadPublicMultiple(
            files,
            UPLOAD_DIR.shelterImgDir,
        );

        return uploaded.map((img) => img.blobName);
    }

    // DB 작업 실패 시 업로드한 Blob 파일 삭제
    async rollback(blobName: string, blobNames: string[]) {
        await this.deleteBlob(blobName);
        await this.deleteBlobs(blobNames);
    }

    // Blob 이미지 삭제
    async deleteBlob(blobName: string) {
        if (!blobName) return;

        await this.deleteBlob(blobName);
    }

    // Blob 이미지 일괄 삭제
    async deleteBlobs(blobNames: string[]) {
        if (!blobNames || blobNames.length === 0) return;

        await Promise.all(
            blobNames.map((img) => this.azureBlob.deleteBlob(img))
        );
    }
}
