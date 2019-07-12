import { DocumentScope } from 'nano';

import { ObjectLiteral } from './interfaces';

export class Repository<T extends ObjectLiteral> {
  public nano: DocumentScope<T>;
  public entity: T;

  constructor(nano: DocumentScope<T>, entity: T) {
    this.nano = nano;
    this.entity = entity;
  }
}
