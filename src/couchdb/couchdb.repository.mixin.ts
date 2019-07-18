import { DocumentScope } from 'nano';

import { Repository } from './interfaces';

export function CouchDbRepositoryMixin<T>(
  driver: DocumentScope<T>,
  entity: T,
): Repository<T> {
  class CouchDbRepository {
    public entity: T;

    constructor() {
      this.entity = entity;
    }
  }

  Object.assign(CouchDbRepository.prototype, driver);

  return CouchDbRepository as any;
}
