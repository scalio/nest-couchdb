import { CouchDbConnectionFactory } from '../../src/couchdb/couchdb.connection.factory';
import { config } from '../__stubs__';

describe('#couchdb', () => {
  describe('#CouchDbConnectionFactory', () => {
    describe('#create', () => {
      it('should be defined', () => {
        expect(typeof CouchDbConnectionFactory.create).toBe('function');
      });
      it('should throw an error if no config', async () => {
        expect(CouchDbConnectionFactory.create(undefined)).rejects.toThrow();
      });
      it('should throw an error if wrong config, 1', async () => {
        expect(CouchDbConnectionFactory.create({} as any)).rejects.toThrow();
      });
      it('should throw an error if wrong config, 2', async () => {
        expect(
          CouchDbConnectionFactory.create({ url: config.url } as any),
        ).rejects.toThrow();
      });
      it('should throw an error if wrong config, 3', async () => {
        expect(
          CouchDbConnectionFactory.create({
            url: config.url,
            username: config.username,
          } as any),
        ).rejects.toThrow();
      });
      it('should throw an error if wrong config, 4', async () => {
        expect(
          CouchDbConnectionFactory.create({
            url: config.url,
            username: config.username,
            userpass: 'invalid',
          } as any),
        ).rejects.toThrow();
      });
      it('should resolve a connection', async () => {
        const test = async () => {
          return await CouchDbConnectionFactory.create(config);
        };
        const connection = await test();
        expect(connection).toHaveProperty('config');
        expect(connection).toHaveProperty('db');
      });
    });
  });
});
