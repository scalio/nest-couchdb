import { COUCHDB_ENTITY_METADATA } from '../couchdb.constants';

export const Entity = (db: string) => (target: Object) => {
  Reflect.defineMetadata(COUCHDB_ENTITY_METADATA, db, target);
};
