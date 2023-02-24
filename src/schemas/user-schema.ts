/**
 * Wraps a user document to make accessing attributes easier
 */
import {
  DocumentData,
  FirestoreDataConverter,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from '@firebase/firestore';
import {DocumentBasedSchema, IDocumentBase} from './document-based-schema';
import {ProductDataPointer} from './product-schema';
import {ReviewDataPointer} from './review-schema';

export interface IUserDocument extends IDocumentBase {
  uid?: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  role: string | null;
  purchases: Array<ProductDataPointer>;
  reviews: Array<ReviewDataPointer>;
}
export interface UserDataPointer {
  id: string;
  first_name: string | null;
  last_name: string | null;
}
export class UserSchema extends DocumentBasedSchema {
  static readonly UID: string = 'uid';
  static readonly FIRST_NAME: string = 'first_name';
  static readonly LAST_NAME: string = 'last_name';
  static readonly EMAIL: string = 'email';
  static readonly ROLE: string = 'role';
  static readonly PURCHASES: string = 'purchases';
  static readonly REVIEWS: string = 'reviews';

  public get uid(): string | null {
    return this.doc.get(UserSchema.UID) ?? this.doc.id;
  }

  public get first_name(): string | null {
    return this.doc.get(UserSchema.FIRST_NAME) ?? null;
  }

  public get last_name(): string | null {
    return this.doc.get(UserSchema.LAST_NAME) ?? null;
  }

  public get email(): string | null {
    return this.doc.get(UserSchema.EMAIL) ?? null;
  }

  public get role(): string | null {
    return this.doc.get(UserSchema.ROLE) ?? 'unknown';
  }

  public get purchases(): Array<ProductDataPointer> {
    return this.doc.get(UserSchema.PURCHASES) ?? [];
  }

  public get reviews(): Array<ReviewDataPointer> {
    return this.doc.get(UserSchema.REVIEWS) ?? [];
  }

  public toPointer(): UserDataPointer {
    return {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
    };
  }

  public toJson(): IUserDocument {
    return {
      uid: this.uid,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      role: this.role,
      purchases: this.purchases,
      reviews: this.reviews,
      created: this.created,
      modified: this.modified,
    };
  }
}

export const userConverter: FirestoreDataConverter<UserSchema> = {
  toFirestore: (post: PartialWithFieldValue<UserSchema>): DocumentData => post,
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): UserSchema =>
    new UserSchema(snapshot),
};
