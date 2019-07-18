import { ServerScope } from 'nano';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { CouchDbConnectionFactory } from '../../src/couchdb';
import { CouchDbModule, getConnectionToken, getRepositoryToken } from '../../src/module';
import { config, Cat } from '../__stubs__';
import { deleteDb } from '../helpers';

describe('#module', () => {
  describe('#CouchDbModule', () => {
    const dbName = 'cats';
    let connection: ServerScope;
    let app: INestApplication;

    beforeAll(async () => {
      connection = await CouchDbConnectionFactory.create(config);
      await deleteDb(connection, dbName);

      const fixture = await Test.createTestingModule({
        imports: [
          CouchDbModule.forRoot({ ...config, sync: true }),
          CouchDbModule.forFeature([Cat]),
        ],
      }).compile();

      app = fixture.createNestApplication();
      await app.init();
    });

    afterAll(async () => {
      await deleteDb(connection, dbName);
      app.close();
    });

    it('should get connection by token', () => {
      const connection = app.get(getConnectionToken());
      expect(connection).toBeDefined();
      expect(connection).toHaveProperty('config');
      expect(connection).toHaveProperty('db');
    });

    it('should get repository by token', () => {
      const repo = app.get(getRepositoryToken(Cat));
      expect(repo).toBeDefined();
      expect(repo).toHaveProperty('entity');
    });
  });
});
