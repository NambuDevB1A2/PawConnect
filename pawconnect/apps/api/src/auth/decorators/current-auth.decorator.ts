import { AuthRequest } from "@/auth/interfaces/auth-request.interface";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentAuth = createParamDecorator(
    (field: keyof AuthRequest, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const auth: AuthRequest = {
            id: request.user.sub,
            email: request.user.email,
            role: request.user.role,
            shelterId: request.user.shelterId,
        };

        return field ? auth?.[field] : auth;
    });