import { Entity, CouchDbEntity } from '../../../src/couchdb';

@Entity('cats')
export class Cat extends CouchDbEntity {}
