'use client';

import React, { createContext, useCallback, useState } from "react";

// 모달이 추가 될 때마다 Key 추가
export type ModalKey = 
    "loginRequired" | 
    "confirmLogout" |
    "confirmDelete" |
    "imageViewer" |
    "contentViewer";

// 모달이 추가 될 때마다 ParamsMap 추가
interface ModalParamsMap {
    loginRequired: undefined;

    confirmLogout: undefined;

    confirmDelete: {
        onConfirm: () => void;
        targetName?: string;
    };

    imageViewer: {
        images: string[];
        currentIndex?: number;
    };

    contentViewer: {
        titleText: string;
        contentText: string;
    }
}

interface ModalContextType {
    activeModal: ModalKey | null;
    params: ModalParamsMap[ModalKey] | null;
    openModal: (key: ModalKey, ...params: [ModalParamsMap[ModalKey]]) => void;
    closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType>({
    activeModal: null,
    params: null,
    openModal: () => {},
    closeModal: () => {},
});

export default function ModalProvider({ children }: { children: React.ReactNode }) {
    const [activeModal, setActiveModal] = useState<ModalKey | null>(null);
    const [params, setParams] = useState<ModalParamsMap[ModalKey] | null>(null);

    const openModal = useCallback((key: ModalKey, ...params: [ModalParamsMap[ModalKey]]) => {
        setActiveModal(key);
        setParams(params[0] as ModalParamsMap[ModalKey]);
    }, []);

    const closeModal = useCallback(() => {
        setActiveModal(null);
        setParams(null);
    }, []);
    
    return (
        <ModalContext.Provider value={{ activeModal, params, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
}