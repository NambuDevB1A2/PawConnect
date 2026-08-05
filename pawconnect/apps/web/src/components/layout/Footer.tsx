'use client';

import Icon from "@/components/common/Icon";
import IconButton from "@/components/common/IconButton";
import Typography from "@/components/common/Typography";
import { TERMS_MESSAGES } from "@/constants/messages/Terms";
import { ModalContext } from "@/providers/ModalProvider";
import styles from "@/styles/layout/Footer.module.css"
import Link from "next/link";
import { useContext } from "react";

export default function Footer() {
    const { openModal } = useContext(ModalContext);
    
    // 이용약관, 개인정보 처리방침 모달
    const handleOpenTermsOfService = () => {
        openModal("contentViewer", { titleText: TERMS_MESSAGES.termsOfService.title, contentText: TERMS_MESSAGES.termsOfService.content });
    }

    const handleOpenPrivacyPolicy = () => {
        openModal("contentViewer", { titleText: TERMS_MESSAGES.privacyPolicy.title, contentText: TERMS_MESSAGES.privacyPolicy.content });
    }

    return (
        <div className={styles.wrapper_footer}>
            <div className={styles.box_left}>
                <div className={styles.box_upper}>
                    <div className={styles.box_logo}>
                        <Icon name="pets" color="primary"/>
                        <Typography variant="subtitle" weight="extrabold">PawConnect</Typography>
                    </div>
                    <Typography>새로운 가족을 찾는 가장 따뜻한 방법</Typography>
                </div>
                <div className={styles.box_copyright}>
                    <a href="https://github.com/NambuDevB1A2/PawConnect/wiki"><IconButton name="commit"/></a>
                    <Typography>© 2026. Team Yeon-hong All Rights Reserved.</Typography>
                </div>
            </div>

            <div className={styles.box_right}>
                <Typography variant="subtitle">서비스</Typography>
                <Link href={`/`}>홈</Link>
                <Link href={`/paw`}>보호동물</Link>
                <Link href={`/shelter`}>보호소</Link>
                <Link href={`/pawlog`}>PawLog</Link>
                <Link href={`/pawlab`}>PawLab</Link>
            </div>

            <div className={styles.box_right}>
                <Typography variant="subtitle">정책</Typography>
                <Typography className={styles.btn_terms} onClick={handleOpenTermsOfService}>이용약관</Typography>
                <Typography className={styles.btn_terms} onClick={handleOpenPrivacyPolicy}>개인정보 처리방침</Typography>
            </div>

            <div className={styles.box_right}>
                <Typography variant="subtitle">문의</Typography>
                <Typography>example@email.com</Typography>
            </div>
        </div>
    );
}