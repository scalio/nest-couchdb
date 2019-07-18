import { DocumentScope } from 'nano';

export class CouchDbRepository<T> {
  constructor(public driver: DocumentScope<T>, public entity: T) {}
}
