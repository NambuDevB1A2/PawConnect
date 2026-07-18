'use client';

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
                <img className={styles.image} src={images[currentIndex]}/>
            </Modal.Body>
        </Modal>
    );
}