'use client';

import { useContext } from "react";
import { ModalContext } from '../../providers/ModalProvider';
import LoginRequiredModal from "@/components/modal/LoginRequiredModal";
import ConfirmDeleteModal from "@/components/modal/ConfirmDeleteModal";

export default function ModalRoot() {
    const { activeModal, closeModal } = useContext(ModalContext);

    // 모달이 추가 될 때마다 이곳에 요소 삽입
    return (
        <div>
            <LoginRequiredModal isOpen={activeModal === "LoginRequired"} onClose={closeModal}/>
            <ConfirmDeleteModal isOpen={activeModal === "ConfirmDelete"} onClose={closeModal}/>
        </div>
    );
}