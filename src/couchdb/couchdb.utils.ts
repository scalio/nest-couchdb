import { MaybeDocument } from 'nano';

import { COUCHDB_ENTITY_METADATA } from './couchdb.constants';

export const getEntityMetadata = <T extends MaybeDocument>(entity: T): string =>
  Reflect.getMetadata(COUCHDB_ENTITY_METADATA, entity);
