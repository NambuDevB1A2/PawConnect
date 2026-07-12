import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import jwtConfig from "../../config/jwt.config";
import type { ConfigType } from "@nestjs/config";

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

    async validate(payload: any) {
        const userPayLoad: JwtPayload = {
            sub: payload.sub,
            role: payload.role,
        };

        return userPayLoad;
    }
}