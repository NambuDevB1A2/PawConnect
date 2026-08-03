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
import AiAgentModal from "@/components/modal/AiAgentModal";
import ConfirmGenerateModal from "@/components/modal/ConfirmGenerateModal";

export default function ModalRoot() {
    const { modalState, closeModal } = useContext(ModalContext);

    // 모달이 추가 될 때마다 이곳에 요소 삽입
    return (
        <div>
            <LoginRequiredModal 
                isOpen={modalState?.key === "loginRequired"} 
                onClose={closeModal}
                />

            <ConfirmLogoutModal
                isOpen={modalState?.key === "confirmLogout"} 
                onClose={closeModal}
                />

            <ConfirmDeleteModal 
                isOpen={modalState?.key === "confirmDelete"} 
                onClose={closeModal}
                onConfirm={modalState?.key === "confirmDelete" ? modalState.params.onConfirm : undefined}
                header={modalState?.key === "confirmDelete" ? modalState.params.header : undefined}
                body={modalState?.key === "confirmDelete" ? modalState.params.body : undefined}
                confirm={modalState?.key === "confirmDelete" ? modalState.params.confirm : undefined}
                />
            
            <ImageViewerModal
                isOpen={modalState?.key === "imageViewer"} 
                onClose={closeModal}
                images={modalState?.key === "imageViewer" ? modalState.params.images : undefined}
                currentIndex={modalState?.key === "imageViewer" ? modalState.params.currentIndex : undefined}
                />
            
            <ContentViewerModal
                isOpen={modalState?.key === "contentViewer"}
                onClose={closeModal}
                titleText={modalState?.key === "contentViewer" ? modalState.params.titleText : ""}
                contentText={modalState?.key === "contentViewer" ? modalState.params.contentText : ""}
                />
            
            <ChangePasswordModal
                isOpen={modalState?.key === "changePassword"}
                onClose={closeModal}
                />
            
            <ConfirmGenerateModal
                isOpen={modalState?.key === "confirmGenerate"} 
                onClose={closeModal}
                onConfirm={modalState?.key === "confirmGenerate" ? modalState.params.onConfirm : undefined}
                imageUrls={modalState?.key === "confirmGenerate" ? modalState.params.imageUrls : []}
                content={modalState?.key === "confirmGenerate" ? modalState.params.content : ""}
                />

            <AiGenerateModal
                isOpen={modalState?.key === "aiGenerate"} 
                onClose={closeModal}
                />

            <AiAgentModal
                isOpen={modalState?.key === "aiAgent"} 
                onClose={closeModal}
                />
        </div>
    );
}