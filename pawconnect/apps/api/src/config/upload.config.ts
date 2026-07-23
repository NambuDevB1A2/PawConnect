import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { BadRequestException } from '@nestjs/common';

export const ALLOWED_MIME = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

// 파일 이름, 아이디 대치 (Uuid)
const imageFilename = (_req, file, callback) => {
    const unique = randomUUID();
    const ext = extname(file.originalname).toLowerCase();
    callback(null, `${unique}${ext}`);
};

// 파일 타입 확인
const imageFileFilter = (_req, file, callback) => {
    if (!ALLOWED_MIME.includes(file.mimetype)) {
        callback(new BadRequestException(), false);
        return;
    }
    callback(null, true);
}

export function createImageUploadOptions(destination: string) {
    return {
        // storage: diskStorage({
        //     destination: destination,
        //     filename: imageFilename,
        // }),
        storage: memoryStorage(),
        fileFilter: imageFileFilter,
        limits: { fileSize: MAX_FILE_SIZE },
    };
}

export function createFieldsImageUploadOptions(fieldDestinationMap: Record<string, string>) {
    return {
        // storage: diskStorage({
        //     destination: (_req, file, callback) => {
        //         const dest = fieldDestinationMap[file.fieldname];
        //         if (!dest) {
        //             callback(new BadRequestException(), '');
        //             return;
        //         }
        //         callback(null, dest);
        //     },
        //     filename: imageFilename,
        // }),
        storage: memoryStorage(),
        fileFilter: imageFileFilter,
        limits: { fileSize: MAX_FILE_SIZE },
    };
}

export const UPLOAD_DIR = {
    dir: "",
    testDir: "test",
    userProfileDir: "user/profile",
    shelterBannerDir: "shelter/banner",
    shelterImgDir: "shelter/img",
    animalImgDir: "animal/img",
    petpostImgDir: "petpost/img",
}