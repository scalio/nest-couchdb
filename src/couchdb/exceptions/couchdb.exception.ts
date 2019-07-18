export class CouchDbException extends Error {
  constructor(msg?: string) {
    super(msg);
  }
}
