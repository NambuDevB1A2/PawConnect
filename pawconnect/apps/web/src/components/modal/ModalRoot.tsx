'use client';

import { useContext } from "react";
import { ModalContext } from '../../providers/ModalProvider';
import LoginRequiredModal from "@/components/modal/LoginRequiredModal";
import ConfirmDeleteModal from "@/components/modal/ConfirmDeleteModal";
import ImageViewerModal from "@/components/modal/ImageViewerModal";
import ContentViewerModal from "@/components/modal/ContentViewerModal";
import ConfirmLogoutModal from "@/components/modal/ConfirmLogoutModal";
import ChangePasswordModal from "@/components/modal/ChangePasswordModal";
import AiGenerateModal from "@/components/modal/AiGenerateModal";

export default function ModalRoot() {
    const { activeModal, params, closeModal } = useContext(ModalContext);

    // 모달이 추가 될 때마다 이곳에 요소 삽입
    return (
        <div>
            <LoginRequiredModal 
                isOpen={activeModal === "loginRequired"} 
                onClose={closeModal}
                />

            <ConfirmLogoutModal
                isOpen={activeModal === "confirmLogout"} 
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
            
            <ContentViewerModal
                isOpen={activeModal === "contentViewer"}
                onClose={closeModal}
                titleText={activeModal === "contentViewer" ? params?.titleText : undefined}
                contentText={activeModal === "contentViewer" ? params?.contentText : undefined}
                />
            
            <ChangePasswordModal
                isOpen={activeModal === "changePassword"}
                onClose={closeModal}
                />

            <AiGenerateModal
                isOpen={activeModal === "aiGenerate"} 
                onClose={closeModal}
                />

        </div>
    );
}