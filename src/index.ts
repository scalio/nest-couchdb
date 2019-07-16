import 'reflect-metadata';

export * from './module';
export * from './couchdb';

import { CouchDbConnectionFactory, CouchDbRepositoryFactory, Entity } from './couchdb';

const config = {
  url: 'http://localhost:5984',
  username: 'couchdb',
  userpass: 'password',
  sync: true,
};

@Entity('foobar')
class Cats {}

async function test() {
  const conn = await CouchDbConnectionFactory.create(config);
  const repositoryFactory = CouchDbRepositoryFactory.create(conn, config);
  const repository = await repositoryFactory.create(Cats as any);
}

test();
