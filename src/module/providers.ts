import { Provider } from '@nestjs/common';
import * as driver from 'nano';

import { ConnectionConfig } from '../interfaces';
import { Repository } from '../repository';
import { ENTITY_METADATA } from '../constants';
import { getConnectionToken, getRepositoryToken } from './utils';

export const createCouchDbConnectionProvider = (config: ConnectionConfig): Provider => ({
  provide: getConnectionToken(),
  useFactory: async () => {
    const conn = driver(config);
    await conn.auth(config.username, config.userpass);
    return conn;
  },
});

export const createCouchDbRepositoryProvider = (entity: Function): Provider => ({
  provide: getRepositoryToken(entity),
  useFactory: (conn: driver.ServerScope) => {
    const db = Reflect.getMetadata(ENTITY_METADATA, entity);
    const nano = conn.use(db);
    return new Repository(nano, entity);
  },
  inject: [getConnectionToken()],
});

export const createCouchDbProviders = (entities: Function[]): Provider[] =>
  entities.map(createCouchDbRepositoryProvider);
