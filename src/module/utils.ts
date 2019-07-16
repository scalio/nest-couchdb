import { COUCHDB_CONNECTION_TOKEN, COUCHDB_REPOSITORY_FACTORY_TOKEN } from './constants';

export const getConnectionToken = (): string => COUCHDB_CONNECTION_TOKEN;
export const getRepositoryFactoryToken = (): string => COUCHDB_REPOSITORY_FACTORY_TOKEN;
export const getRepositoryToken = (entity: Function): string =>
  `${entity.name}_REPOSITORY_TOKEN`;
