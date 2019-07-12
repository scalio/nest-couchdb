import { Configuration } from 'nano';

export interface ConnectionConfig extends Configuration {
  username: string;
  userpass: string;
}
