'use client';

import Typography from "@/components/common/Typography";
import Modal from "@/components/modal/Modal";
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import { MODAL_MESSAGES } from "@/constants/messages/Modal";

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
}

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm }: ConfirmDeleteModalProps) {
    const handleConfirm = () => {
        onConfirm?.();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Header>
                <Icon name="error" color="error" size="hero"/>
                <Typography variant="modaltitle">{MODAL_MESSAGES.confirmDelete.header}</Typography>
            </Modal.Header>
            <Modal.Body>
                <Typography variant="body1">{MODAL_MESSAGES.confirmDelete.body}</Typography>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="modal" onClick={onClose}>{MODAL_MESSAGES.confirmDelete.close}</Button>
                <Button variant="danger" onClick={handleConfirm}>{MODAL_MESSAGES.confirmDelete.confirm}</Button>
            </Modal.Footer>
        </Modal>
    );
}