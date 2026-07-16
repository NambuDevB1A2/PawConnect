'use client';

import React, { createContext, useCallback, useState } from "react";

// 모달이 추가 될 때마다 Key 추가
export type ModalKey = 
    "LoginRequired" | 
    "ConfirmDelete";

interface ModalContextType {
    activeModal: ModalKey | null;
    openModal: (key: ModalKey) => void;
    closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType>({
    activeModal: null,
    openModal: (key) => {},
    closeModal: () => {},
});

export default function ModalProvider({ children }: { children: React.ReactNode }) {
    const [activeModal, setActiveModal] = useState<ModalKey | null>(null);

    const openModal = useCallback((key: ModalKey) => {
        setActiveModal(key);
    }, []);

    const closeModal = useCallback(() => {
        setActiveModal(null);
    }, []);
    
    return (
        <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
}