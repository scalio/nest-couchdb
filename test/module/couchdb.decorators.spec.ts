import { oO } from '@zmotivat0r/o0';
import { ServerScope } from 'nano';
import { plainToClass } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { CouchDbConnectionFactory, Repository } from '../../src/couchdb';
import { CouchDbModule, InjectConnection, InjectRepository } from '../../src/module';
import { config, Cat } from '../__stubs__';
import { deleteDb } from '../helpers';

describe('#module', () => {
  describe('#CouchDb inject decorators', () => {
    const dbName = 'cats';
    let connection: ServerScope;
    let app: INestApplication;
    let service: TestService;
    let insertedId: string;

    @Injectable()
    class TestService {
      constructor(
        @InjectRepository(Cat) public repo: Repository<Cat>,
        @InjectConnection() public connection: ServerScope,
      ) {}

      async test() {
        return this.repo.info();
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
      await deleteDb(connection, dbName);
      app.close();
    });

    describe('#InjectRepository', () => {
      it('should inject repository', () => {
        expect(service.repo).toBeDefined();
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

    describe('#repository', () => {
      it('should save document', async () => {
        const cat = plainToClass<Cat, Cat>(Cat, {
          name: 'cat',
          action: 'meow',
          isActive: true,
        });
        const [_, inserted] = await oO(service.repo.insert(cat));
        expect(inserted.ok).toBe(true);
        expect(typeof inserted.id).toBe('string');
        expect(typeof inserted.rev).toBe('string');
        insertedId = inserted.id;
      });

      it('should get document', async () => {
        const [_, cat] = await oO(service.repo.get(insertedId));
        expect(cat._id).toBe(insertedId);

        const [, list] = await oO(service.repo.list());
        console.log(list);
      });
    });
  });
});
