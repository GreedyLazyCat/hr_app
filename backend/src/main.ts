import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ObjectNotFoundExceptionFilter } from './common/filters/object-not-found-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new ObjectNotFoundExceptionFilter());
  await app.listen(process.env.BACKEND_PORT ?? 4000);
}
bootstrap();
