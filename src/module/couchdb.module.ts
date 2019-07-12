import { Module, DynamicModule } from '@nestjs/common';

import { ConnectionConfig } from '../interfaces';
import { CouchDbCoreModule } from './couchdb-core.module';
import { createCouchDbProviders } from './providers';

@Module({})
export class CouchDbModule {
  static forRootAsync(config: ConnectionConfig): DynamicModule {
    return {
      module: CouchDbModule,
      imports: [CouchDbCoreModule.forRootAsync(config)],
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
