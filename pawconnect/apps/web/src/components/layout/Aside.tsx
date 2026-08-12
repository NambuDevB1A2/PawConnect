'use client';

import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import { ModalContext } from "@/providers/ModalProvider";
import styles from "@/styles/layout/Aside.module.css"
import { useContext } from "react";

export default function Aside() {
    const { openModal } = useContext(ModalContext);

    const handleAgent = () => {
        openModal("aiAgent");
    };

    return (
        <div className={styles.wrapper_aside}>
            <div className={styles.box_list}>
                <Button className={styles.btn_aside} onClick={handleAgent}>
                    <Icon name="support_agent" size="hero" color="white" fill/>
                </Button>
            </div>
        </div>
    );
}