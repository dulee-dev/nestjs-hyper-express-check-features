import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class BlockBodyPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value: ', value);
    console.log('metadata: ', metadata);
    if (metadata.type === 'body')
      throw new HttpException('block body', HttpStatus.BAD_REQUEST);
    return value;
  }
}
