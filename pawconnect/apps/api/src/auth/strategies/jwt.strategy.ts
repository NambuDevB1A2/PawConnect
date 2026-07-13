import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { ConfigType } from "@nestjs/config";
import jwtConfig from "@/config/jwt.config";
import { JwtPayload } from "@/auth/interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConfiguration.jwt_secret as string,
        });
    }

    async validate(payload: JwtPayload) {
        return payload;
    }
}