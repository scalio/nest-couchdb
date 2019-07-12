import * as driver from 'nano';

import { ConnectionConfig } from './interfaces';
import { ObjectType } from './types';
import { Repository } from './repository';
import { ENTITY_METADATA } from './constants';

export class Connection {
  static nano: driver.ServerScope;
  static repositories: { [key: string]: Repository<any> } = {};

  static async create(config: ConnectionConfig) {
    Connection.nano = driver(config);
    await Connection.nano.auth(config.username, config.userpass);
  }

  static addRepository<T>(entity: T) {
    const db = Reflect.getMetadata(ENTITY_METADATA, entity);
    const nano = Connection.nano.use<T>(db);
    const token = Connection.getToken<T>(entity, db);

    Connection.repositories[token] = new Repository<T>(nano, entity);
  }

  static getRepository<T>(entity: T): Repository<T> {
    const db = Reflect.getMetadata(ENTITY_METADATA, entity);
    const token = Connection.getToken<T>(entity, db);

    return Connection.repositories[token];
  }

  private static getToken<T extends any>(entity: T, db: string): string {
    return `${entity.name}_${db}_Repository`;
  }
}
