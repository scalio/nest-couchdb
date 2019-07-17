import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { CouchDbModule, getConnectionToken } from '../../src/module';
import { config, Cat } from '../__stubs__';

describe('#module', () => {
  describe('#CouchDbModule', () => {
    let app: INestApplication;

    beforeAll(async () => {
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
      app.close();
    });

    it('should get connection by token', () => {
      const connection = app.get(getConnectionToken());
      expect(connection).toBeDefined();
      expect(connection).toHaveProperty('config');
      expect(connection).toHaveProperty('db');
    });
  });
});
