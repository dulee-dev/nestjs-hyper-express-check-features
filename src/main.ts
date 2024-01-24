import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HyperExpressAdapter } from './libs/platform-hyper-express/hyper-express.adapter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new HyperExpressAdapter());
  // const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      whitelist: true,
      transform: false,
    }),
  );
  await app.listen(3000);
}
bootstrap();
