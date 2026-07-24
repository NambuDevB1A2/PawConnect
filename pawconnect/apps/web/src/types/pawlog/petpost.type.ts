import { User } from "@/types/user.type";

export interface PetPostImages {
    id: string;
    img: string;
}

export interface PetPost {
    id: string;
    title: string;
    content: string;
    author: User;
    updatedAt: string;
    images: PetPostImages[];
}
