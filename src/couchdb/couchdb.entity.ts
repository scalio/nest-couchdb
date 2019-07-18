import { MaybeDocument } from 'nano';

export class CouchDbEntity implements MaybeDocument {
  _id?: string;
  _rev?: string;
}
