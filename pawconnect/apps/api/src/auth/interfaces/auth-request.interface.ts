import { Role } from "@prisma/client";

export interface AuthRequest {
    email: string;
    role: Role;
}