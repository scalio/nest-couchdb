import { Configuration } from 'nano';

export interface CouchDbConnectionConfig extends Configuration {
  username: string;
  userpass: string;
  sync?: boolean;
}
