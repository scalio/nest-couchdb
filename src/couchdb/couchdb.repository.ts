import { DocumentScope } from 'nano';

import { CouchDbEntity } from './couchdb.entity';

export class CouchDbRepository<T extends CouchDbEntity> {
  constructor(private driver: DocumentScope<T>, private entity: T) {}
}
