import { COUCHDB_ENTITY_METADATA } from './couchdb.constants';

export const getEntityMetadata = <T extends Function>(entity: T): string =>
  Reflect.getMetadata(COUCHDB_ENTITY_METADATA, entity);
