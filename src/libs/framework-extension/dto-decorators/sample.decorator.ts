import { applyDecorators } from '@nestjs/common';
import { IsString, IsUUID } from 'class-validator';

export function SampleDeco() {
  return applyDecorators(IsString(), IsUUID());
}
