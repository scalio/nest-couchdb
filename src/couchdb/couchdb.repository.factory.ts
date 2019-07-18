import * as nano from 'nano';

import { CouchDbConnectionConfig, Repository } from './interfaces';
import { CouchDbException } from './exceptions';
import { CouchDbRepositoryMixin } from './couchdb.repository.mixin';
import { getEntityMetadata } from './couchdb.utils';

export class CouchDbRepositoryFactory {
  constructor(
    private connection: nano.ServerScope,
    private config: CouchDbConnectionConfig,
  ) {}

  static create(
    connection: nano.ServerScope,
    config: CouchDbConnectionConfig,
  ): CouchDbRepositoryFactory {
    return new CouchDbRepositoryFactory(connection, config);
  }

  async create<T>(entity: T): Promise<Repository<T>> {
    const dbName = this.getDbName(entity);
    const checked = await this.checkDatabase(dbName);
    const driver = this.connection.use<T>(dbName);

    return new (CouchDbRepositoryMixin<T>(driver, entity))();
  }

  private getDbName(entity: any): string {
    const dbName = getEntityMetadata(entity);

    if (!dbName) {
      throw new CouchDbException('Invalid database name in @Entity decorator');
    }
    return dbName;
  }

  private async checkDatabase(dbName: string): Promise<boolean> {
    try {
      const database = await this.connection.db.get(dbName);
      return true;
    } catch (error) {
      if (this.config.sync) {
        return this.createDatabase(dbName);
      }
      throw error;
    }
  }

  private async createDatabase(dbName: string): Promise<boolean> {
    const database = await this.connection.db.create(dbName);
    return true;
  }
}
