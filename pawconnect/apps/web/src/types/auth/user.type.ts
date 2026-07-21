import { Enums } from "@/types/enum";

export interface User {
    email: string;
    nickname: string;
    role: Enums.Role;
    imgProfile: string;
}