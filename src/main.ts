import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { AppModule } from '@market-lab-test/app';
import { HttpServer } from '@nestjs/common/interfaces/http/http-server.interface';

async function bootstrap() {
  const app = await NestFactory.create<INestApplication & HttpServer>(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useBodyParser('text');

  const config = new DocumentBuilder()
    .setTitle('MarketLab Test')
    .setDescription('The MarketLab Test API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const configService: ConfigService = app.get(ConfigService);
  const appPort = configService.get('APP_PORT', 3000);
  await app.listen(appPort);
}
bootstrap();
