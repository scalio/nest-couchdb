import * as nano from 'nano';

import { CouchDbConnectionConfig } from './interfaces';

export class CouchDbConnectionFactory {
  static async create(config: CouchDbConnectionConfig): Promise<nano.ServerScope> {
    const connection = nano(config);
    await connection.auth(config.username, config.userpass);
    return connection;
  }
}
