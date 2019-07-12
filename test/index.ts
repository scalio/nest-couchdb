import { Connection, Entity, Repository } from '../src';

@Entity('cats')
class People {
  constructor() {}
}

async function test() {
  await Connection.create({
    url: 'http://localhost:5984',
    username: 'couchdb',
    userpass: 'password',
  });

  Connection.addRepository(People);

  const repo = Connection.getRepository<People>(People);

  const info = await repo.nano.info();

  console.log(info);
}

test();
