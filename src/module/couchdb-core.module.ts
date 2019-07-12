import { Global, Module, DynamicModule } from '@nestjs/common';

import { ConnectionConfig } from '../interfaces';
import { createCouchDbConnectionProvider } from './providers';

@Global()
@Module({})
export class CouchDbCoreModule {
  static forRootAsync(config: ConnectionConfig): DynamicModule {
    const connectionProvider = createCouchDbConnectionProvider(config);
    return {
      module: CouchDbCoreModule,
      providers: [connectionProvider],
      exports: [connectionProvider],
    };
  }
}
