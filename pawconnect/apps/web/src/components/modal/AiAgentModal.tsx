'use client';

import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import IconButton from "@/components/common/IconButton";
import Input from "@/components/common/Input";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Typography from "@/components/common/Typography";
import Modal from "@/components/modal/Modal";
import { PostAiAgentChat } from "@/services/ai/ai-agent-chat.client";
import styles from "@/styles/modal/AiAgentModal.module.css"
import { KeyboardEvent, useEffect, useRef, useState } from "react";

interface AiAgentChatButton {
    label: string;
    onClick: () => void;
}

interface AiAgentChatProps {
    role: "user" | "ai";
    content?: string;
    buttons?: AiAgentChatButton[];
    children?: React.ReactNode;
}

function AiAgentChat({ role, content, buttons, children }: AiAgentChatProps) {
    const isUser = role === "user";

    return (
        <div className={`${styles.wrapper_chat} ${styles[role]}`}>
            <div className={styles.ai_profile}>
                {!isUser && <Icon wrapperClassName={styles.icon_agent} name="support_agent" color="white"/>}
            </div>
            <div className={styles.box_chat_content}>
                <div className={styles.box_chat}>
                    {content && <Typography>{content}</Typography>}
                    {children}
                </div>
                {buttons && buttons?.length > 0 &&
                    buttons.map((btn, index) => 
                    <Button key={index} variant="outline" size="small" onClick={btn.onClick}>
                        {btn.label}
                    </Button>)
                }
            </div>
        </div>
    );
}

interface AiAgentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AiAgentModal({ isOpen, onClose }: AiAgentModalProps) {
    const [chats, setChats] = useState<AiAgentChatProps[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isPending, setIsPending] = useState(false);
    const bodyRef = useRef<HTMLDivElement>(null);

    const defaultAiAgentChat: AiAgentChatProps = {
        role: "ai",
        content: "안녕하세요! 저는 PawConnect AI 에이전트예요. 성향에 맞는 아이 추천, 보호소 안내, 입양 절차 안내를 도와드릴 수 있어요.",
        buttons: [
            { label: "성향에 맞는 아이를 추천해주세요", onClick: (() => addSubmit("성향에 맞는 아이를 추천해주세요")) },
            { label: "근처 보호소를 찾아주세요", onClick: (() => addSubmit("근처 보호소를 찾아주세요")) },
            { label: "입양 절차가 궁금해요", onClick: (() => addSubmit("입양 절차가 궁금해요")) },
        ],
    };

    // 최신 채팅으로 스크롤 이동
    const scrollToBottom = () => {
        if (!bodyRef.current) return;

        bodyRef.current.scrollTo({
            top: bodyRef.current.scrollHeight,
            behavior: "smooth",
        });
    };

    // 채팅 전송하기
    const addSubmit = async (content: string) => {
        setChats((prev) => [...prev, { role: "user", content: content }]);
        setInputValue("");

        setIsPending(true);

        // 대기
        const result = await PostAiAgentChat(content);
        setIsPending(false);

        if (result?.success) {
            setChats((prev) => [...prev, { role: "ai", content: result.content }]);
        }
    };

    // 전송 버튼 핸들
    const handleSubmit = () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;

        addSubmit(trimmed);
    };

    // Enter키 입력 핸들
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.nativeEvent.isComposing) {
            e.preventDefault();
            handleSubmit();
        }
    };
    
    useEffect(() => {
        scrollToBottom();
    }, [chats, isPending]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="medium" className={styles.wrapper_modal}>
            <Modal.Header className={styles.wrapper_header}>
                <Icon wrapperClassName={styles.icon_agent} name="support_agent" color="white"/>
                <Typography className={styles.typo_header} variant="subtitle">AI 에이전트</Typography>
                <IconButton className={styles.btn_close} name="close" onClick={onClose}/>
            </Modal.Header>

            <Modal.Body className={styles.wrapper_body} ref={bodyRef}>
                <AiAgentChat {...defaultAiAgentChat} />
                {chats.map((chat, index) => <AiAgentChat key={index} {...chat}/>)}
                {isPending && <AiAgentChat role="ai"><LoadingSpinner size="small"/></AiAgentChat>}
            </Modal.Body>

            <Modal.Footer className={styles.wrapper_footer}>
                <Input 
                    wrapperClassname={styles.input_footer} 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isPending}
                    />
                <Button 
                    className={styles.btn_submit} 
                    onClick={handleSubmit}
                    disabled={isPending}>전송</Button>
            </Modal.Footer>
        </Modal>
    );
}