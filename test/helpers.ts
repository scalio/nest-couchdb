import { oO } from '@zmotivat0r/o0';
import { ServerScope } from 'nano';

export const deleteDb = async (connection: ServerScope, dbName: string): Promise<any> =>
  oO(connection.db.destroy(dbName));
