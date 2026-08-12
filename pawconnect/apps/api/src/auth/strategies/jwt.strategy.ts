import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "@/auth/interfaces/jwt-payload.interface";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromAuthHeaderAsBearerToken(),
                (req: Request) => req?.cookies?.accessToken ?? null,
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('jwt.jwt_secret'),
        });
    }

    async validate(payload: JwtPayload) {
        return payload;
    }
}