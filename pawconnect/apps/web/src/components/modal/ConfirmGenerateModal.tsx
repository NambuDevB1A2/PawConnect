'use client';

import Typography from "@/components/common/Typography";
import Modal from "@/components/modal/Modal";
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import { MODAL_MESSAGES } from "@/constants/messages/Modal";
import AppImage from "@/components/common/AppImage";
import styles from "@/styles/modal/ConfirmGenerateModal.module.css"

interface ConfirmGenerateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    imageUrls?: string[];
    content?: string;
}

export default function ConfirmGenerateModal({ isOpen, onClose, onConfirm, imageUrls, content }: ConfirmGenerateModalProps) {
    const handleConfirm = () => {
        onConfirm?.();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="large">
            <Modal.Header>
                <Icon name="error" color="error" size="hero"/>
                <Typography variant="modaltitle">{MODAL_MESSAGES.confirmGenerate.header}</Typography>
            </Modal.Header>
            <Modal.Body>
                {imageUrls && imageUrls.length > 0 &&
                    <div className={styles.box_images}>
                        {imageUrls?.map((img) => <AppImage key={img} src={img} className={styles.image} disabledDomain />)}
                    </div>}
                {content &&
                    <div className={styles.box_content}>
                        <Typography variant="body1">{content}</Typography>
                    </div>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="modal" onClick={onClose}>{MODAL_MESSAGES.confirmGenerate.close}</Button>
                <Button variant="danger" onClick={handleConfirm}>{MODAL_MESSAGES.confirmGenerate.confirm}</Button>
            </Modal.Footer>
        </Modal>
    );
}