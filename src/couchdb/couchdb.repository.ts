import { DocumentScope } from 'nano';

export class CouchDbRepository<T> {
  constructor(private driver: DocumentScope<T>, private entity: T) {}
}
