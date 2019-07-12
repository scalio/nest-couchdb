import { ENTITY_METADATA } from '../constants';

export const Entity = (db: string) => (target: Object) => {
  Reflect.defineMetadata(ENTITY_METADATA, db, target);
};
