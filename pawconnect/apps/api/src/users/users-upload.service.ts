import { AzureBlobService } from '@/azure/azure-blob/azure-blob.service';
import { UPLOAD_DIR } from '@/config/upload.config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersUploadService {
    constructor (
        private readonly azureBlob: AzureBlobService,
    ) {}

    // 이미지 업로드
    async uploadImage(file: Express.Multer.File) {
        if (!file) return;

        const result = await this.azureBlob.uploadPublic(
            file,
            UPLOAD_DIR.userProfileDir,
        );

        return result.blobName;
    }

    // DB 작업 실패 시 업로드한 Blob 파일 삭제
    async rollback(blobName: string) {
        await this.deleteBlob(blobName);
    }

    // Blob 이미지 삭제
    async deleteBlob(blobName: string) {
        if (!blobName) return;

        await this.azureBlob.deleteBlob(blobName);
    }
}
