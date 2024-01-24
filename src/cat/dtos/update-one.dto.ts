import { Cat } from '../cat.entity';

export interface CreateOneBody extends Omit<Cat, 'id'> {}
