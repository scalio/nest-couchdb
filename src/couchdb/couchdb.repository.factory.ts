import * as nano from 'nano';

import { CouchDbRepository } from './couchdb.repository';
import { getEntityMetadata } from './couchdb.utils';

export class CouchDbRepositoryFactory {
  static create<T extends nano.MaybeDocument>(
    connection: nano.ServerScope,
    entity: T,
  ): CouchDbRepository<T> {
    const db = getEntityMetadata(entity);
    const driver = connection.use<T>(db);
    return new CouchDbRepository<T>(driver, entity);
  }
}
