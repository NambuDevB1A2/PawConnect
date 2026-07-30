'use client';

import Typography from "@/components/common/Typography";
import Modal from "@/components/modal/Modal";
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import { MODAL_MESSAGES } from "@/constants/messages/Modal";
import AppImage from "@/components/common/AppImage";

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
                {imageUrls?.map((img) => <AppImage key={img} src={img} sizes="small" disabledDomain />)}
                <Typography variant="body1">{content}</Typography>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="modal" onClick={onClose}>{MODAL_MESSAGES.confirmGenerate.close}</Button>
                <Button variant="danger" onClick={handleConfirm}>{MODAL_MESSAGES.confirmGenerate.confirm}</Button>
            </Modal.Footer>
        </Modal>
    );
}