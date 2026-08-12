import { Injectable, OnModuleInit } from '@nestjs/common';
import { BlobSASPermissions, BlobServiceClient, ContainerClient, generateBlobSASQueryParameters, StorageSharedKeyCredential } from "@azure/storage-blob"
import { extname } from 'path';
import { randomUUID } from 'crypto';

@Injectable()
export class AzureBlobService implements OnModuleInit {
    private blobServiceClient: BlobServiceClient;

    // 컨테이너 접근을 위한 변수
    private publicContainer: ContainerClient;

    onModuleInit() {
        const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
        if (!connectionString) {
            throw new Error(`.env에 AZURE_STORAGE_CONNECTION_STRING를 넣으세요`);
        }

        // 업로드 클라이언트
        this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

        const publicName = process.env.AZURE_PUBLIC_CONTAINER;
        if (!publicName) {
            throw new Error(`.env에 AZURE_PUBLIC_CONTAINER를 넣으세요`);
        }
        // 컨테이너를 연결
        this.publicContainer = this.blobServiceClient.getContainerClient(publicName);
    }
    
    // 저장용 고유 파일명
    makeBlobName(originName: string) {
        const ext = extname(originName).toLowerCase();
        const uuid = randomUUID();
        return `${uuid}${ext}`;
    }

    // product-images 안에 images 가상폴더를 만들고 파일 업로드
    async uploadPublic(
        file: Express.Multer.File,
        folder = "images"
    ): Promise<{ blobName: string, url: string }> {
        // Azure에 파일을 저장하는 로직
        // images = 가상폴더
        const blobName = `${folder}/${this.makeBlobName(file.originalname)}`;
        const blockBlob = this.publicContainer.getBlockBlobClient(blobName);
        await blockBlob.uploadData(file.buffer, { 
            blobHTTPHeaders: { blobContentType: file.mimetype },
        });

        return { blobName, url: blockBlob.url };
    }

    // 다중 이미지 업로드
    async uploadPublicMultiple(
        files: Express.Multer.File[],
        folder = "images"
    ): Promise<{ blobName: string; url: string }[]> {
        if (!files || files.length === 0) {
            return [];
        }

        // Promise.allSettled로 일부 실패해도 전체가 죽지 않도록 처리
        const results = await Promise.allSettled(
            files.map((file) => this.uploadPublic(file, folder))
        );

        const succeeded: { blobName: string; url: string }[] = [];
        const failed: { fileName: string; error: unknown }[] = [];

        results.forEach((result, index) => {
            if (result.status === "fulfilled") {
                succeeded.push(result.value);
            } else {
                failed.push({
                    fileName: files[index].originalname,
                    error: result.reason,
                });
            }
        });

        if (failed.length > 0) {
            // 일부 실패 시 로깅 (필요하면 로거 주입해서 사용)
            console.error("일부 파일 업로드 실패:", failed);
            // 정책에 따라: 부분 성공 허용 or 전체 롤백
            // throw new InternalServerErrorException(`${failed.length}개 파일 업로드 실패`);
        }

        return succeeded;
    }

    // Blob 삭제
    async deleteBlob(blobName: string) {
        try {
            const blockBlob = this.publicContainer.getBlockBlobClient(blobName);
            await blockBlob.deleteIfExists();
        } catch (error) {
            // 에러 메세지 표시
        }
    }

    // 새 파일 업로드 성공 후 기존 파일 삭제
    async replacePublic(
        oldBlobName: string | null | undefined,
        newFile: Express.Multer.File,
        folder = "images"
    ): Promise<{ blobName: string; url: string; }> {
        const uploaded = await this.uploadPublic(newFile, folder);

        if (oldBlobName) {
            // 업로드 성공 후에 삭제 (실패 대비)
            await this.deleteBlob(oldBlobName);
        }

        return uploaded;
    }
}
