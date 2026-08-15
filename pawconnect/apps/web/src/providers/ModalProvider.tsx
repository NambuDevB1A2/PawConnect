'use client';

import React, { createContext, useCallback, useState } from "react";

// 모달이 추가 될 때마다 Key 추가
export type ModalKey = 
    "loginRequired" | 
    "confirmLogout" |
    "confirmDelete" |
    "imageViewer" |
    "contentViewer" |
    "changePassword" |
    "adoptionDetail" |
    "confirmGenerate" |
    "aiGenerate" |
    "aiAgent";

// 모달이 추가 될 때마다 ParamsMap 추가
interface ModalParamsMap {
    loginRequired: undefined;

    confirmLogout: undefined;

    confirmDelete: {
        onConfirm: () => void;
        targetName?: string;
        header?: string;
        body?: string;
        confirm?: string;
    };

    imageViewer: {
        images: string[];
        currentIndex?: number;
    };

    contentViewer: {
        titleText: string;
        contentText: string;
    };

    changePassword: undefined;

    adoptionDetail: {
        adoptionId: string;
    };

    confirmGenerate: {
        onConfirm: () => void;
        imageUrls?: string[];
        content?: string;
        subContent?: string;
    };

    aiGenerate: undefined;

    aiAgent: undefined;
}

type ModalState = {
    [K in ModalKey]: { key: K; params: ModalParamsMap[K] }
}[ModalKey];

interface ModalContextType {
    modalState: ModalState | null;
    openModal: <K extends ModalKey>(key: K, ...params: ModalParamsMap[K] extends undefined ? [] : [ModalParamsMap[K]]) => void;
    closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType>({
    modalState: null,
    openModal: () => {},
    closeModal: () => {},
});

export default function ModalProvider({ children }: { children: React.ReactNode }) {
    const [modalState, setModalState] = useState<ModalState | null>(null);

    const openModal = useCallback(<K extends ModalKey>(
        key: K, 
        ...params: ModalParamsMap[K] extends undefined ? [] : [ModalParamsMap[K]]
    ) => {
        setModalState({ key, params: params[0] } as ModalState);
    }, []);

    const closeModal = useCallback(() => {
        setModalState(null);
    }, []);
    
    return (
        <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
}