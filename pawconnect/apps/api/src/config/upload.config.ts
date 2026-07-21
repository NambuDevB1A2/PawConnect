import { diskStorage } from 'multer';
import { extname, parse } from 'path';
import { randomUUID } from 'crypto';
import { BadRequestException } from '@nestjs/common';

export const ALLOWED_MINE = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

// 파일 이름에서 아이디 추출 (Uuid)
export function getImageId(file: Express.Multer.File) {
    return parse(file.filename).name;
}

// 파일 이름, 아이디 대치 (Uuid)
const imageFilename = (_req, file, callback) => {
    const unique = randomUUID();
    const ext = extname(file.originalname).toLowerCase();
    callback(null, `${unique}${ext}`);
};

// 파일 타입 확인
const imageFileFilter = (_req, file, callback) => {
    if (!ALLOWED_MINE.includes(file.mimetype)) {
        callback(new BadRequestException(), false);
        return;
    }
    callback(null, true);
}

export function createImageUploadOptions(destination: string) {
    return {
        storage: diskStorage({
            destination: destination,
            filename: imageFilename,
        }),
        fileFilter: imageFileFilter,
        limits: { fileSize: MAX_FILE_SIZE },
    };
}

export function createFieldsImageUploadOptions(fieldDestinationMap: Record<string, string>) {
    return {
        storage: diskStorage({
            destination: (_req, file, callback) => {
                const dest = fieldDestinationMap[file.fieldname];
                if (!dest) {
                    callback(new BadRequestException(), '');
                    return;
                }
                callback(null, dest);
            },
            filename: imageFilename,
        }),
        fileFilter: imageFileFilter,
        limits: { fileSize: MAX_FILE_SIZE },
    };
}

export const UPLOAD_DIR = {
    dir: "uploads",
    testDir: "uploads/test",
    userProfileDir: "uploads/user/profile",
    shelterBannerDir: "uploads/shelter/banner",
    shelterImgDir: "uploads/shelter/img",
    animalImgDir: "uploads/animal/img",
    petpostImgDir: "uploads/petpost/img",
}