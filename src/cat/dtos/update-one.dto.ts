import { Cat } from '../cat.entity';

export interface UpdateOneBody extends Pick<Cat, 'name'> {}
