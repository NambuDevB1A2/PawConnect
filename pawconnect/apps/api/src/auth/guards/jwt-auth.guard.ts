import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC_KEY } from "../../common/decorators/public.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor (private readonly reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ],
        );

        if (isPublic) return true;
        
        const isValid = await super.canActivate(context);
        if (!isValid) throw new UnauthorizedException();

        const req = context.switchToHttp().getRequest();
        const authorization = req.heafers.authorization;
        if (!authorization || !authorization.startsWith('Bearer ')) throw new UnauthorizedException();

        const token = authorization.split(' ')[1];
        if (!token) throw new UnauthorizedException();

        return true;
    }
}