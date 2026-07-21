import { Role } from "@prisma/client";

export interface AuthRequest {
    id: string;
    email: string;
    role: Role;
}