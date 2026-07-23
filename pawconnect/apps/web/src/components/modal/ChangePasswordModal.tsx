'use client';

import Typography from "@/components/common/Typography";
import Modal from "@/components/modal/Modal";
import Button from "@/components/common/Button";
import { MODAL_MESSAGES } from "@/constants/messages/Modal";
import InputPassword from "@/components/common/InputPassword";
import { ChangePasswordState } from "@/types/mypage/change-password.type";
import { useActionState, useEffect } from "react";
import { ChangePassword } from "@/services/users/change-password.client";
import styles from "@/styles/modal/Modal.module.css"

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const initialState: ChangePasswordState = { };

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
    const [state, formAction, isPending] = useActionState(ChangePassword, initialState); // Login에서 fetch

    
    useEffect(() => {
        if (state.response?.success) {
            onClose();
            alert('비밀번호 변경에 성공했습니다');
        }
    }, [state]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="medium">
            <form action={formAction} className={styles.box_form}>
                <Modal.Header>
                    <Typography variant="modaltitle">비밀번호 변경</Typography>
                </Modal.Header>
                <Modal.Body>
                    <InputPassword
                        name="prevPassword"
                        labelText="현재 비밀번호"
                        helperText="현재 비밀번호를 입력해주세요"
                        errorText={state.prevPasswordError}
                        />
                    <InputPassword 
                        name="newPassword" 
                        labelText="새 비밀번호" 
                        helperText="비밀번호를 입력해주세요(영문 대소문자, 숫자, 특수문자 6~30자)"
                        errorText={state.newPasswordError}
                        />
                    <InputPassword 
                        name="newRePassword" 
                        labelText="새 비밀번호 확인" 
                        helperText="비밀번호를 다시 입력해주세요"
                        errorText={state.newRePasswordError}
                        />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="modal" type="button" onClick={onClose}>{MODAL_MESSAGES.changePassword.close}</Button>
                    <Button variant="primary" type="submit">
                        {isPending ? MODAL_MESSAGES.changePassword.changingPassword : MODAL_MESSAGES.changePassword.confirm}
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}