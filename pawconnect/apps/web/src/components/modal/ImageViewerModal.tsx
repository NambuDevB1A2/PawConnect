'use client';

import AppImage from "@/components/common/AppImage";
import Modal from "@/components/modal/Modal";
import styles from "@/styles/modal/ImageViewerModal.module.css"

interface ImageViewerModalProps {
    isOpen: boolean;
    onClose: () => void;
    images?: string[];
    currentIndex?: number;
}

export default function ImageViewerModal({ 
    isOpen, 
    onClose, 
    images,
    currentIndex = 0,
}: ImageViewerModalProps) {
    if (!images || images?.length === 0) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} className={styles.modal}>
            <Modal.Body>
                <AppImage className={styles.image} src={images[currentIndex]} width={1200} height={1200}/>
            </Modal.Body>
        </Modal>
    );
}