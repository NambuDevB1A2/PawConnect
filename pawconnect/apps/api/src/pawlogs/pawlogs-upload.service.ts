import { AzureBlobService } from '@/azure/azure-blob/azure-blob.service';
import { UPLOAD_DIR } from '@/config/upload.config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PawLogsUploadService {
    constructor (
        private readonly azureBlob: AzureBlobService,
    ) {}

    // 이미지 업로드
    async uploadImages(files: Express.Multer.File[]) {
        if (!files || files.length === 0) return;

        return await this.azureBlob.uploadPublicMultiple(
            files,
            UPLOAD_DIR.pawLogImgDir,
        );
    }

    // DB 작업 실패 시 업로드한 Blob 파일 삭제
    async rollback(blobNames: string[]) {
        await this.deleteBlobs(blobNames);
    }

    // Blob 이미지 일괄 삭제
    async deleteBlobs(blobNames: string[]) {
        if (!blobNames || blobNames.length === 0) return;

        await Promise.all(
            blobNames.map((img) => this.azureBlob.deleteBlob(img))
        );
    }
}
