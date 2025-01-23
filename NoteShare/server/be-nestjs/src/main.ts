import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  //await app.listen(process.env.PORT ?? 3000);
  
  app.enableCors({
    origin: 'http://localhost:3000', // React frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  logger.log('Application is running on: http://localhost:${port}/');
}
bootstrap();