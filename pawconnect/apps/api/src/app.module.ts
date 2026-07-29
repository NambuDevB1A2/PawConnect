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
import { AiModule } from '@/ai/ai.module';
import { AdoptionsModule } from './adoptions/adoptions.module';
import commonConfig from '@/config/common.config';
import jwtConfig from '@/config/jwt.config';
import bcryptConfig from '@/config/bcrypt.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UPLOAD_DIR } from '@/config/upload.config';
import { AzureModule } from './azure/azure.module';
import { PawLogsModule } from './pawlogs/pawlogs.module';
import { HomeModule } from './home/home.module';

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
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), UPLOAD_DIR.dir),
      serveRoot: `/${UPLOAD_DIR.dir}`,
    }),
    AzureModule,
    PrismaModule,

    HomeModule,
    AuthModule,
    UsersModule,
    SheltersModule,
    AnimalsModule,
    AdoptionsModule,
    PawLogsModule,
    TestsModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
