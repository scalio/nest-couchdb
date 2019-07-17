import { MaybeDocument } from 'nano';

export class CouchDbEntity extends Function implements MaybeDocument {
  _id: string;
  _rev: string;
}
