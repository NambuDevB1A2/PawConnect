'use client';

import Typography from "@/components/common/Typography";
import Modal from "@/components/modal/Modal";
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import { MODAL_MESSAGES } from "@/constants/messages/Modal";
import { Logout } from "@/services/auth/logout.server";
import { useRouter } from "next/navigation";

interface ConfirmLogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ConfirmLogoutModal({ isOpen, onClose }: ConfirmLogoutModalProps) {
    const router = useRouter();

    const handleLogout = async () => {
        onClose();
        const res = await Logout();

        if (res.response?.success) {
            router.push('/');
            alert("로그아웃에 성공했습니다");
        } else {
            alert("로그아웃 도중 오류가 발생했습니다");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Header>
                <Icon name="error" color="error" size="hero"/>
                <Typography variant="modaltitle">{MODAL_MESSAGES.confirmLogout.header}</Typography>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="modal" onClick={onClose}>{MODAL_MESSAGES.confirmLogout.close}</Button>
                <Button variant="danger" onClick={handleLogout}>{MODAL_MESSAGES.confirmLogout.confirm}</Button>
            </Modal.Footer>
        </Modal>
    );
}