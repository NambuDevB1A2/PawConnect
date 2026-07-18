'use client';

import { useContext } from "react";
import { ModalContext } from '../../providers/ModalProvider';
import LoginRequiredModal from "@/components/modal/LoginRequiredModal";
import ConfirmDeleteModal from "@/components/modal/ConfirmDeleteModal";
import ImageViewerModal from "@/components/modal/ImageViewerModal";

export default function ModalRoot() {
    const { activeModal, params, closeModal } = useContext(ModalContext);

    // 모달이 추가 될 때마다 이곳에 요소 삽입
    return (
        <div>
            <LoginRequiredModal 
                isOpen={activeModal === "loginRequired"} 
                onClose={closeModal}
                />

            <ConfirmDeleteModal 
                isOpen={activeModal === "confirmDelete"} 
                onClose={closeModal}
                onConfirm={activeModal === "confirmDelete" ? params?.onConfirm : undefined}
                />
            
            <ImageViewerModal
                isOpen={activeModal === "imageViewer"} 
                onClose={closeModal}
                images={activeModal === "imageViewer" ? params?.images : undefined}
                currentIndex={activeModal === "imageViewer" ? params?.currentIndex : undefined}
                />
        </div>
    );
}