import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HyperExpressAdapter } from './libs/platform-hyper-express/hyper-express.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new HyperExpressAdapter());
  // const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
