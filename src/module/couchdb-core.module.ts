import { Global, Module, DynamicModule } from '@nestjs/common';

import { CouchDbConnectionConfig } from '../couchdb';
import { createCouchDbConnectionProviders } from './providers';

@Global()
@Module({})
export class CouchDbCoreModule {
  static forRoot(config: CouchDbConnectionConfig): DynamicModule {
    const providers = createCouchDbConnectionProviders(config);
    return {
      module: CouchDbCoreModule,
      providers,
      exports: providers,
    };
  }
}
