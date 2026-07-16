'use client';

import styles from "@/styles/modal/LoginModal.module.css"
import Typography from "@/components/common/Typography";
import Modal from "@/components/modal/Modal";
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { MODAL_MESSAGES } from "@/constants/messages/Modal";

interface LoginRequiredModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginRequiredModal({ isOpen, onClose }: LoginRequiredModalProps) {
    const router = useRouter();

    const handleLogin = useCallback(() => {
        router.push('/login');
        onClose();
    }, []);
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Header>
                <Icon name="warning" color="primary" size="hero"/>
                <Typography variant="modaltitle">{MODAL_MESSAGES.loginRequired.header}</Typography>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="modal" onClick={onClose}>{MODAL_MESSAGES.loginRequired.close}</Button>
                <Button variant="primary" onClick={handleLogin}>{MODAL_MESSAGES.loginRequired.confirm}</Button>
            </Modal.Footer>
        </Modal>
    );
}