import { Module } from '@nestjs/common';
import { CatController } from './cat/cat.controller';

@Module({
  imports: [],
  controllers: [CatController],
})
export class AppModule {}
