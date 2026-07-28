// 애니멀 이미지 업로드 타입
export interface AnimalUploadFiles {
    imgThumbnail: Express.Multer.File[];
    images: Express.Multer.File[];
}