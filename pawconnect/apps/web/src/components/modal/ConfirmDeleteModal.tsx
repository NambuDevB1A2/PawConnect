'use client';

import Typography from "@/components/common/Typography";
import Modal from "@/components/modal/Modal";
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete?: () => void;
}

export default function ConfirmDeleteModal({ isOpen, onClose, onDelete }: ConfirmDeleteModalProps) {
    const handleDelete = () => {
        onDelete?.();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Header>
                <Icon name="error" color="error" size="hero"/>
                <Typography variant="modaltitle">정말로 삭제하시겠습니까?</Typography>
            </Modal.Header>
            <Modal.Body>
                <Typography variant="body1">삭제 후에는 복구할 수 없습니다.</Typography>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="modal" onClick={onClose}>닫기</Button>
                <Button variant="danger" onClick={handleDelete}>삭제</Button>
            </Modal.Footer>
        </Modal>
    );
}