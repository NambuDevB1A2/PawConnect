'use client';

import LoadingSpinner from "@/components/common/LoadingSpinner";
import Typography from "@/components/common/Typography";
import Modal from "@/components/modal/Modal";
import { MODAL_MESSAGES } from "@/constants/messages/Modal";

interface AiGenerateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AiGenerateModal({ isOpen, onClose }: AiGenerateModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={() => {}}>
            <Modal.Header>
                <Typography variant="modaltitle">{MODAL_MESSAGES.aiGenerate.header}</Typography>
            </Modal.Header>
            <Modal.Body>
                <LoadingSpinner size="large"/>
                <Typography>{MODAL_MESSAGES.aiGenerate.content}</Typography>
            </Modal.Body>
        </Modal>
    );
}