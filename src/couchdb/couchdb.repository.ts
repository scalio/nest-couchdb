import { DocumentScope, MaybeDocument } from 'nano';

export class CouchDbRepository<T extends MaybeDocument> {
  constructor(private driver: DocumentScope<T>, private entity: T) {}
}
