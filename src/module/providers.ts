import { Provider } from '@nestjs/common';
import { ServerScope } from 'nano';

import {
  CouchDbConnectionFactory,
  CouchDbRepositoryFactory,
  CouchDbConnectionConfig,
} from '../couchdb';
import {
  getConnectionToken,
  getRepositoryFactoryToken,
  getRepositoryToken,
} from './utils';

export const createCouchDbConnectionProviders = (
  config: CouchDbConnectionConfig,
): Provider[] => [
  {
    provide: getConnectionToken(),
    useFactory: async () => CouchDbConnectionFactory.create(config),
  },
  {
    provide: getRepositoryFactoryToken(),
    useFactory: (connection: ServerScope) =>
      CouchDbRepositoryFactory.create(connection, config),
    inject: [getConnectionToken()],
  },
];

export const createCouchDbRepositoryProvider = (entity: Function): Provider => ({
  provide: getRepositoryToken(entity),
  useFactory: async (repositoryFactory: CouchDbRepositoryFactory) =>
    repositoryFactory.create(entity),
  inject: [getRepositoryFactoryToken()],
});

export const createCouchDbProviders = (entities: Function[]): Provider[] =>
  entities.map(createCouchDbRepositoryProvider);
