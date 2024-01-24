import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.method && req.body) {
      throw new HttpException('Get has body', HttpStatus.BAD_REQUEST);
    }
    console.log(req.method);
    console.log(req.body);
    next();
  }
}
