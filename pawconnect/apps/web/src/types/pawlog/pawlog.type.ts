import { User } from "@/types/auth/user.type";

export interface PawLogImage {
    id: string;
    img: string;
}

export interface PawLog {
    id: number;
    title: string;
    content: string;
    author: User;
    updatedAt: string;
    images: PawLogImage[];
}
