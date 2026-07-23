'use client';

import Typography from "@/components/common/Typography";
import Modal from "@/components/modal/Modal";
import Button from "@/components/common/Button";
import { MODAL_MESSAGES } from "@/constants/messages/Modal";
import TextArea from "@/components/common/TextArea";
import styles from "@/styles/modal/ContentViewerModal.module.css"

interface ContentViewerModalProps {
    titleText: string;
    contentText: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function ContentViewerModal({ titleText, contentText, isOpen, onClose }: ContentViewerModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="large">
            <Modal.Header>
                <Typography variant="modaltitle">{titleText}</Typography>
            </Modal.Header>
            <Modal.Body>
                <TextArea className={styles.textarea} defaultValue={contentText} disabled disabledCount/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="modal" onClick={onClose}>{MODAL_MESSAGES.contentViewer.close}</Button>
            </Modal.Footer>
        </Modal>
    );
}