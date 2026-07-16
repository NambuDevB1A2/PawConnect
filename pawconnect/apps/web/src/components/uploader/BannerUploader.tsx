'use client';

import styles from "@/styles/uploader/BannerImageUploader.module.css"
import ImageUploader, { ImageUploaderProps } from "@/components/uploader/ImageUploader";
import { UPLOADER_MESSAGES } from "@/constants/messages/Uploader";

interface BannerImageUploaderProps extends ImageUploaderProps {
}

export default function BannerImageUploader({
    helperText = UPLOADER_MESSAGES.banner.helper,
    ...props
}: BannerImageUploaderProps) {
    return (
        <ImageUploader
            helperText={helperText}
            previewBoxClassName={styles.box_preview_banner}
            previewImageClassName={styles.box_image_banner}
            {...props}
        />
    );
}