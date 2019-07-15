import { Global, Module, DynamicModule } from '@nestjs/common';

import { CouchDbConnectionConfig } from '../couchdb';
import { createCouchDbConnectionProvider } from './providers';

@Global()
@Module({})
export class CouchDbCoreModule {
  static forRootAsync(config: CouchDbConnectionConfig): DynamicModule {
    const connectionProvider = createCouchDbConnectionProvider(config);
    return {
      module: CouchDbCoreModule,
      providers: [connectionProvider],
      exports: [connectionProvider],
    };
  }
}
