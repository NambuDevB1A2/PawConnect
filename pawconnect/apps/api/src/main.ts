import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '@/app.module';
import cookieParser from 'cookie-parser';
import { mkdirSync } from 'fs';
import { UPLOAD_DIR } from '@/config/upload.config';

async function bootstrap() {
  // Upload Dir
  mkdirSync(UPLOAD_DIR.dir, { recursive: true });
  mkdirSync(UPLOAD_DIR.userProfileDir, { recursive: true });
  mkdirSync(UPLOAD_DIR.shelterBannerDir, { recursive: true });
  mkdirSync(UPLOAD_DIR.shelterImgDir, { recursive: true });
  mkdirSync(UPLOAD_DIR.animalImgDir, { recursive: true });
  mkdirSync(UPLOAD_DIR.petpostImgDir, { recursive: true });

  const app = await NestFactory.create(AppModule);
  
  // Config
  const configService = app.get(ConfigService);
  const commonConfig = configService.getOrThrow('common');

  // Validator
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Swagger 
  const config = new DocumentBuilder()
    .setTitle("PawConnect API Document")
    .setDescription("사람과 유기동물을 연결하는 입양 플랫폼")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  SwaggerModule.setup("api", app, SwaggerModule.createDocument(app, config));

  // CORS
  app.use(cookieParser());
  app.enableCors({
    origin: `${commonConfig.webDomain}:${commonConfig.webPort}`,
    credentials: true,
  });

  await app.listen(commonConfig.port);
  console.log(`Start to Server: ${commonConfig.domain}:${commonConfig.port} (swagger: ${commonConfig.domain}:${commonConfig.port}/api)`);
}
bootstrap();
