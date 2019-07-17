import { Module, DynamicModule } from '@nestjs/common';

import { CouchDbConnectionConfig } from '../couchdb';
import { CouchDbCoreModule } from './couchdb-core.module';
import { createCouchDbProviders } from './providers';

@Module({})
export class CouchDbModule {
  static forRoot(config: CouchDbConnectionConfig): DynamicModule {
    return {
      module: CouchDbModule,
      imports: [CouchDbCoreModule.forRoot(config)],
    };
  }

  static forFeature(entities: Function[]): DynamicModule {
    const providers = createCouchDbProviders(entities);
    return {
      module: CouchDbModule,
      providers,
      exports: providers,
    };
  }
}
