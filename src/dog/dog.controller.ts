import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { GetQuery } from './dtos/get.dto';
import { CustomExceptionFilter } from 'src/libs/framework-extension/filter/custom.filter';
import { BlockBodyPipe } from 'src/libs/framework-extension/pipe/block-body.pipe';
import { AuthGuard } from 'src/libs/framework-extension/guard/auth.guard';
import { FakeInterceptor } from 'src/libs/framework-extension/interceptor/fake.interceptor';

@Controller('/dog')
export class DogController {
  constructor() {}

  @Get()
  @UseFilters(CustomExceptionFilter)
  @UseGuards(AuthGuard)
  @UseInterceptors(new FakeInterceptor<string>('fake'))
  get(@Query() query: GetQuery) {
    // throw new HttpException('custom message', HttpStatus.BAD_REQUEST);
    return 'ok';
  }
}
