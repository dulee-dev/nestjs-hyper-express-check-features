import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CatController } from './cat/cat.controller';
import { DogController } from './dog/dog.controller';
import { LoggerMiddleware } from './libs/framework-extension/middleware/logger.middleware';

@Module({
  imports: [],
  controllers: [CatController, DogController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'dog', method: RequestMethod.GET })
      .forRoutes('/');
  }
}
