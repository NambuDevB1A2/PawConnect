'use client';

import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import IconButton from "@/components/common/IconButton";
import Input from "@/components/common/Input";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Typography from "@/components/common/Typography";
import Modal from "@/components/modal/Modal";
import AnimalCard from "@/components/paw/AnimalCard";
import ShelterCard from "@/components/shelter/ShelterCard";
import { MODAL_MESSAGES } from "@/constants/messages/Modal";
import { PostAiAgentChat } from "@/services/ai/ai-agent-chat.client";
import styles from "@/styles/modal/AiAgentModal.module.css"
import { renderMultiline } from "@/utils/format-component.util";
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
                {content &&
                    <div className={styles.box_chat}>
                        <Typography>{renderMultiline(content)}</Typography>
                    </div>
                }
                {buttons && buttons?.length > 0 &&
                    buttons.map((btn, index) => 
                    <Button key={index} variant="outline" size="small" onClick={btn.onClick}>
                        {btn.label}
                    </Button>)
                }
                {children}
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
    const [conversationId, setConversationId] = useState<string | undefined>(undefined); // 추가
    const bodyRef = useRef<HTMLDivElement>(null);

    const defaultAiAgentChat: AiAgentChatProps = {
        role: "ai",
        content: MODAL_MESSAGES.aiAgent.hello,
        buttons: [
            { label: MODAL_MESSAGES.aiAgent.defaultChat.recommendAnimal, onClick: (() => addSubmit(MODAL_MESSAGES.aiAgent.defaultChat.recommendAnimal)) },
            { label: MODAL_MESSAGES.aiAgent.defaultChat.nearbyShelter, onClick: (() => addSubmit(MODAL_MESSAGES.aiAgent.defaultChat.nearbyShelter)) },
            { label: MODAL_MESSAGES.aiAgent.defaultChat.adoptionProcess, onClick: (() => addSubmit(MODAL_MESSAGES.aiAgent.defaultChat.adoptionProcess)) },
        ],
    };

    // 최신 채팅으로 스크롤 이동
    const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
        if (!bodyRef.current) return;

        bodyRef.current.scrollTo({
            top: bodyRef.current.scrollHeight,
            behavior: behavior,
        });
    };

    const handleBodyRef = (node: HTMLDivElement | null) => {
        bodyRef.current = node;
        if (node) {
            node.scrollTop = node.scrollHeight;
        }
    };

    // 채팅 전송하기
    const addSubmit = async (content: string) => {
        setChats((prev) => [...prev, { role: "user", content: content }]);
        setInputValue("");

        setIsPending(true);

        // 대기
        const result = await PostAiAgentChat(content, conversationId);
        setIsPending(false);

        if (result?.success) {
            if (result.conversationId) {
                setConversationId(result.conversationId);
            }

            setChats((prev) => [...prev, { 
                role: "ai", 
                content: result.content,
                children:
                <div onClick={onClose}>
                    {result.animal ? <AnimalCard animal={result.animal} /> : null}
                    {result.shelter ? <ShelterCard shelter={result.shelter} /> : null}
                </div>
            }]);
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

    // 메시지 추가될 때는 부드럽게 스크롤
    useEffect(() => {
        scrollToBottom();
    }, [chats, isPending]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="medium" className={styles.wrapper_modal}>
            <Modal.Header className={styles.wrapper_header}>
                <Icon wrapperClassName={styles.icon_agent} name="support_agent" color="white"/>
                <Typography className={styles.typo_header} variant="subtitle">{MODAL_MESSAGES.aiAgent.header}</Typography>
                <IconButton className={styles.btn_close} name="close" onClick={onClose}/>
            </Modal.Header>

            <Modal.Body className={styles.wrapper_body} ref={handleBodyRef}>
                <AiAgentChat {...defaultAiAgentChat} />
                {chats.map((chat, index) => <AiAgentChat key={index} {...chat}/>)}
                {isPending && <AiAgentChat role="ai"><LoadingSpinner size="medium"/></AiAgentChat>}
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
                    disabled={isPending}>{MODAL_MESSAGES.aiAgent.submit}</Button>
            </Modal.Footer>
        </Modal>
    );
}