import { oO } from '@zmotivat0r/o0';
import { ServerScope } from 'nano';
import { Injectable } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { CouchDbConnectionFactory, CouchDbRepository } from '../../src/couchdb';
import { CouchDbModule, InjectConnection, InjectRepository } from '../../src/module';
import { config, Cat } from '../__stubs__';
import { deleteDb } from '../helpers';

describe('#module', () => {
  describe('#CouchDb inject decorators', () => {
    const dbName = 'cats';
    let connection: ServerScope;
    let app: INestApplication;
    let service: TestService;

    @Injectable()
    class TestService {
      constructor(
        @InjectRepository(Cat) public repo: CouchDbRepository<Cat>,
        @InjectConnection() public connection: ServerScope,
      ) {}

      async test() {
        return this.repo.driver.info();
      }
    }

    beforeAll(async () => {
      connection = await CouchDbConnectionFactory.create(config);
      await deleteDb(connection, dbName);

      const fixture = await Test.createTestingModule({
        imports: [
          CouchDbModule.forRoot({ ...config, sync: true }),
          CouchDbModule.forFeature([Cat]),
        ],
        providers: [TestService],
      }).compile();

      app = fixture.createNestApplication();
      await app.init();
      service = app.get<TestService>(TestService);
    });

    afterAll(async () => {
      app.close();
    });

    describe('#InjectRepository', () => {
      it('should inject repository', () => {
        expect(service.repo).toBeInstanceOf(CouchDbRepository);
      });
      it('should return database info', async () => {
        const [_, info] = await oO(service.test());
        expect(info).toBeDefined();
        expect(info.db_name).toBe(dbName);
      });
    });

    describe('#InjectConnection', () => {
      it('should inject connection', () => {
        expect(service.connection).toBeDefined();
        expect(service.connection).toHaveProperty('config');
        expect(service.connection).toHaveProperty('db');
      });
    });
  });
});
