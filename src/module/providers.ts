import { Provider } from '@nestjs/common';
import { ServerScope, MaybeDocument } from 'nano';

import {
  CouchDbConnectionFactory,
  CouchDbRepositoryFactory,
  CouchDbConnectionConfig,
} from '../couchdb';
import { getConnectionToken, getRepositoryToken } from './utils';

export const createCouchDbConnectionProvider = (
  config: CouchDbConnectionConfig,
): Provider => ({
  provide: getConnectionToken(),
  useFactory: async () => CouchDbConnectionFactory.create(config),
});

export const createCouchDbRepositoryProvider = (entity: Function): Provider => ({
  provide: getRepositoryToken(entity),
  useFactory: async (connection: ServerScope) =>
    CouchDbRepositoryFactory.create(connection, entity as MaybeDocument),
  inject: [getConnectionToken()],
});

export const createCouchDbProviders = (entities: Function[]): Provider[] =>
  entities.map(createCouchDbRepositoryProvider);
