import { Entity, CouchDbEntity } from '../../../src/couchdb';

@Entity('cats')
export class Cat extends CouchDbEntity {
  name: string;
  action: string;
  isActive: boolean;
}
