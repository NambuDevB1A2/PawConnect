'use client';

import styles from "@/styles/uploader/BannerImageUploader.module.css"
import ImageUploader, { ImageUploaderProps } from "@/components/uploader/ImageUploader";

interface BannerImageUploaderProps extends ImageUploaderProps {
}

export default function BannerImageUploader({
    ...props
}: BannerImageUploaderProps) {
    return (
        <ImageUploader
            previewBoxClassName={styles.box_preview_banner}
            previewImageClassName={styles.box_image_banner}
            {...props}
        />
    );
}