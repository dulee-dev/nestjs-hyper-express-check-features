import { IsNumber, IsString } from 'class-validator';
import { Cat } from '../cat.entity';
import { SampleDeco } from '../../libs/framework-extension/dto-decorators/sample.decorator';

// export interface CreateOneBody extends Omit<Cat, 'id'> {}

export class CreateOneBody implements Omit<Cat, 'id'> {
  @SampleDeco()
  name: string;

  @IsNumber()
  age: number;
}
