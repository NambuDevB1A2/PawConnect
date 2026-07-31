'use client';

import { useModalBehavior } from "@/hooks/modal/useModalBehavior";
import styles from "@/styles/modal/Modal.module.css"
import { forwardRef, HTMLAttributes, useEffect, useState } from "react";

type ModalSize = "small" | "medium" | "large" | "xlarge";

interface ModalProps extends HTMLAttributes<HTMLDivElement>  {
    children?: React.ReactNode;
    size?: ModalSize;
    closeOnOverlayClick?: boolean;
    isOpen: boolean;
    onClose: () => void;
    overlayClassName?: string;
}

export default function Modal({ 
    children,
    size = "small",
    closeOnOverlayClick = true,
    className = "",
    overlayClassName = "",
    isOpen,
    onClose,
    ...props
}: ModalProps) {
    const [mounted, setMounted] = useState(false);
    const [render, setRender] = useState(isOpen);

    useModalBehavior(isOpen, onClose);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (isOpen) {
            setRender(true);
        } else {
            const timer = setTimeout(() => setRender(false), 200);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!mounted || !render) return null;

    return (
        <div 
            className={`${styles.overlay} ${isOpen ? styles.overlay_open : ""} ${overlayClassName}`}
            onClick={(() => closeOnOverlayClick && onClose())}>
            <div 
                className={`${styles.modal} ${isOpen ? styles.modal_open : ""} ${styles[size]} ${className}`} 
                onClick={(e) => e.stopPropagation()}
                {...props}
                >
                {children}
            </div>
        </div>
    );
}

interface ModalSectionProps {
    children: React.ReactNode;
    className?: string;
}

const Header = forwardRef<HTMLDivElement, ModalSectionProps>(
    ({ children, className = "" }, ref) => {
        return <div ref={ref} className={`${styles.box_header} ${className}`}>{children}</div>;
    }
);
Header.displayName = "Modal.Header";

const Body = forwardRef<HTMLDivElement, ModalSectionProps>(
    ({ children, className = "" }, ref) => {
        return <div ref={ref} className={`${styles.box_body} ${className}`}>{children}</div>;
    }
);
Body.displayName = "Modal.Body";

const Footer = forwardRef<HTMLDivElement, ModalSectionProps>(
    ({ children, className = "" }, ref) => {
        return <div ref={ref} className={`${styles.box_footer} ${className}`}>{children}</div>;
    }
);
Footer.displayName = "Modal.Footer";

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;