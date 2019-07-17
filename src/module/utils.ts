import { COUCHDB_CONNECTION_TOKEN, COUCHDB_REPOSITORY_FACTORY_TOKEN } from './constants';
import { CouchDbEntity } from '../couchdb';

export const getConnectionToken = (): string => COUCHDB_CONNECTION_TOKEN;
export const getRepositoryFactoryToken = (): string => COUCHDB_REPOSITORY_FACTORY_TOKEN;
export const getRepositoryToken = (entity: CouchDbEntity): string =>
  `${entity.name}_REPOSITORY_TOKEN`;
