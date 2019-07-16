import * as nano from 'nano';

import { CouchDbConnectionConfig } from './interfaces';

export class CouchDbConnectionFactory {
  static config: CouchDbConnectionConfig;

  static async create(config: CouchDbConnectionConfig): Promise<nano.ServerScope> {
    const connection = nano(config);
    await connection.auth(config.username, config.userpass);
    CouchDbConnectionFactory.config = config;
    return connection;
  }
}
