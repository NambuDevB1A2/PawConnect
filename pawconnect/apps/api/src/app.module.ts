import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { envValidationSchema } from '@/config/env.validation';
import { PrismaModule } from '@/prisma/prisma.module';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';
import { SheltersModule } from '@/shelters/shelters.module';
import { AnimalsModule } from '@/animals/animals.module';
import { TestsModule } from '@/tests/tests.module';
import { PetpostsModule } from '@/petposts/petposts.module';
import { AiModule } from '@/ai/ai.module';
import { AdoptionsModule } from './adoptions/adoptions.module';
import commonConfig from '@/config/common.config';
import jwtConfig from '@/config/jwt.config';
import bcryptConfig from '@/config/bcrypt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [commonConfig, jwtConfig, bcryptConfig],
      envFilePath: `.env`,
      validationSchema: envValidationSchema,
      validationOptions: {
        abortEarly: true,
      }
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    SheltersModule,
    AnimalsModule,
    TestsModule,
    PetpostsModule,
    AiModule,
    AdoptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
