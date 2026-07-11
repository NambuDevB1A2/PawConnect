import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigType } from '@nestjs/config';
import commonConfig from './config/common.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const common = app.get<ConfigType<typeof commonConfig>>(commonConfig.KEY);
  
  // Validator
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Swagger 
  const config = new DocumentBuilder()
    .setTitle("Echo API Document")
    .setDescription("사람과 유기동물을 연결하는 입양 플랫폼")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  SwaggerModule.setup("api", app, SwaggerModule.createDocument(app, config));

  // CORS
  app.enableCors({
    origin: `${common.webDomain}:${common.webPort}`,
    credentials: true,
  });

  await app.listen(common.port);
  console.log(`Start to Server: ${common.domain}:${common.port} (swagger: ${common.domain}:${common.port}/api)`);
}
bootstrap();
