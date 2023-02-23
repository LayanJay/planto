/**
 * Wraps a user document to make accessing attributes easier
 */
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from '@firebase/firestore';
import {DataPointer} from '../interfaces/data-pointer';
import {DocumentBasedSchema} from './document-based-schema';

export class UserSchema extends DocumentBasedSchema {
  static readonly UID: string = 'uid';
  static readonly FIRST_NAME: string = 'first_name';
  static readonly LAST_NAME: string = 'last_name';
  static readonly EMAIL: string = 'email';
  static readonly ROLE: string = 'role';

  public get uid(): string {
    return this.doc.get(UserSchema.UID) ?? this.doc.id;
  }

  public get first_name(): string {
    return this.doc.get(UserSchema.FIRST_NAME) ?? null;
  }

  public get last_name(): string {
    return this.doc.get(UserSchema.LAST_NAME) ?? null;
  }

  public get email(): string | null {
    return this.doc.get(UserSchema.EMAIL) ?? null;
  }

  public get role(): string {
    return this.doc.get(UserSchema.ROLE) ?? 'unknown';
  }

  public toPointer(): DataPointer {
    return {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
    };
  }
}

export const userConverter: FirestoreDataConverter<UserSchema> = {
  toFirestore(post: WithFieldValue<UserSchema>): DocumentData {
    return post;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): UserSchema {
    return new UserSchema(snapshot);
  },
};
