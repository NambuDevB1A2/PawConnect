import { Enums } from "@/types/enum";

export interface User {
    id: string;
    email: string;
    nickname: string;
    role: Enums.Role;
    shelterId: string;
    imgProfile: string;
}