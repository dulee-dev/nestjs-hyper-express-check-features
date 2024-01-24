import { IsOptional, IsString } from 'class-validator';

export class GetQuery {
  @IsString()
  @IsOptional()
  test?: string;
}
