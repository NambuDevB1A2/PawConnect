import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import jwtConfig from '@/config/jwt.config';
import { UsersModule } from '@/users/users.module';
import { SheltersModule } from '@/shelters/shelters.module';
import { AuthService } from '@/auth/auth.service';
import { JwtStrategy } from '@/auth/strategies/jwt.strategy';
import { AuthController } from '@/auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      inject: [jwtConfig.KEY],
      useFactory: (config: ConfigType<typeof jwtConfig>) => ({
        secret: config.jwt_secret,
        signOptions: { expiresIn: config.jwt_expires_in },
      }),
    }),

    UsersModule,
    SheltersModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
