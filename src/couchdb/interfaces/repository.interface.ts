import { DocumentScope } from 'nano';

export interface Repository<T> extends DocumentScope<T> {
  new (): Repository<T>;
  entity: T;
}
