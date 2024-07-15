// DEPENDENCIES
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

// MODULES
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
