import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthRequest } from "../interfaces/auth-request.interface";

export const CurrentAuth = createParamDecorator(
    (field: keyof AuthRequest, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const auth: AuthRequest = {
            email: request.user.sub,
            role: request.user.role,
        };

        return field ? auth?.[field] : auth;
    });