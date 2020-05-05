![CouchDB for NestJS](https://raw.githubusercontent.com/scalio/nest-couchbase/master/scalio-nc.svg?sanitize=true)

<h1 align="center">NestJS CouchDB</h1>

<p align="center">
  A <a href="http://couchdb.apache.org/">CouchDB</a> module for <a href="https://nestjs.com/">NestJS</a>
</p>

[![CircleCI](https://circleci.com/gh/scalio/nest-couchdb/tree/master.svg?style=svg)](https://circleci.com/gh/scalio/nest-couchdb/tree/master)

&nbsp;

## Installation

```bash
$ npm i @scalio/nest-couchdb nano
```

## Usage

`@scalio/nest-couchdb` uses [nano](https://www.npmjs.com/package/nano) as a data provider for CouchDB and the `Repository` pattern to handle all documents related operations.

First, let's create an `Entity`:

```typescript
import { Entity, CouchDbEntity } from '@scalio/nest-couchdb';

@Entity('cats')
export class Cat extends CouchDbEntity {
  name: string;
}
```

Where `cats` is the CouchDB database name.

The `CouchDbEntity` is a base class which has some common properties:

```typescript
class CouchDbEntity {
  _id: string;
  _rev: string;
}
```

Then, we need to import `CouchDbModule` in our `ApplicationModule`:

```typescript
import { Module } from '@nestjs/common';
import { CouchDbModule } from '@scalio/nest-couchdb';

@Module({
  imports: [
    CouchDbModule.forRoot({
      url: 'http://localhost:5984',
      username: 'couchdb',
      userpass: 'password',
      requestDefaults: { jar: true },
    }),
  ],
})
export class ApplicationModule {}
```

In our `CatsModule` we need to initiate repository for our `Cat` entity:

```typescript
import { Module } from '@nestjs/common';
import { CouchDbModule } from '@scalio/nest-couchdb';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { Cat } from './cat.entity';

@Module({
  imports: [CouchDbModule.forFeature([Cat])],
  providers: [CatsService],
  controllers: [CatsController],
})
export class CatsModule {}
```

And here is the usage of the repository in the service:

```typescript
import { DocumentListResponse } from 'nano';
import { Injectable } from '@nestjs/common';
import { InjectRepository, Repository } from '@scalio/nest-couchdb';
import { Cat } from './cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catsRepository: Repository<Cat>,
  ) {}

  findAll(): Promise<DocumentListResponse<Cat> {
    return this.catsRepository.list();
  }
}
```

## Test

```bash
$ docker-compose up -d
$ npm test
```

## License

[MIT](LICENSE)

## Credits

Created by [@zMotivat0r](https://github.com/zMotivat0r) @ [Scalio](https://scal.io/)

## About us

<p align="center">
    <br/>
    <a href="https://scal.io/">
        <img src="https://raw.githubusercontent.com/scalio/bazel-status/master/assets/scalio-logo.svg?sanitize=true" />
    </a>
    <br/>
</p>
