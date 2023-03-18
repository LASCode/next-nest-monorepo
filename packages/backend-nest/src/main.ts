import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function startServer() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({origin: 'http://localhost:3000', credentials: true});
  await app.listen(3001, () =>
      console.log(`Сервер запущен на localhost:3001`),
  );
}
void startServer();
