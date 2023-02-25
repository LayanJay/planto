/**
 * Wraps a user document to make accessing attributes easier
 */
import {
  DocumentData,
  DocumentSnapshot,
  FirestoreDataConverter,
  SnapshotOptions,
  WithFieldValue,
} from '@firebase/firestore';
import {DataPointer} from '../interfaces/data-pointer';
import {FirebaseUtils} from '../utils/firebase-utils';
import {DocumentBasedSchema, IDocumentBase} from './document-based-schema';
import {ProductDataPointer} from './product-schema';
import {ReviewDataPointer} from './review-schema';

export interface IUserDocument extends IDocumentBase {
  uid: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  purchases: Array<ProductDataPointer>;
  reviews: Array<ReviewDataPointer>;
}
export interface UserDataPointer extends DataPointer {
  first_name: string;
  last_name: string;
}
export class UserSchema extends DocumentBasedSchema implements IUserDocument {
  readonly uid: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly role: string;
  readonly purchases: ProductDataPointer[];
  readonly reviews: ReviewDataPointer[];
  static readonly UID: string = 'uid';
  static readonly FIRST_NAME: string = 'first_name';
  static readonly LAST_NAME: string = 'last_name';
  static readonly EMAIL: string = 'email';
  static readonly ROLE: string = 'role';
  static readonly PURCHASES: string = 'purchases';
  static readonly REVIEWS: string = 'reviews';

  public constructor(doc: IUserDocument) {
    super(doc);
    this.uid = doc.uid;
    this.first_name = doc.first_name;
    this.last_name = doc.last_name;
    this.email = doc.email;
    this.role = doc.role;
    this.purchases = doc.purchases;
    this.reviews = doc.reviews;
  }

  public toPointer(): UserDataPointer {
    return {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
    };
  }

  public static toJson(doc: UserSchema | WithFieldValue<UserSchema>) {
    return {
      [UserSchema.UID]: doc.uid,
      [UserSchema.FIRST_NAME]: doc.first_name,
      [UserSchema.LAST_NAME]: doc.last_name,
      [UserSchema.EMAIL]: doc.email,
      [UserSchema.ROLE]: doc.role,
      [UserSchema.PURCHASES]: doc.purchases,
      [UserSchema.REVIEWS]: doc.reviews,
      [UserSchema.CREATED]: doc.created,
      [UserSchema.MODIFIED]: doc.modified,
    };
  }

  public static createDocFromJson(
    json: Omit<IUserDocument, 'id' | 'created' | 'modified'> &
      Partial<Pick<IUserDocument, 'created' | 'modified'>>
  ): UserSchema {
    return new UserSchema({id: null, ...FirebaseUtils.getCreatedTimestamp(), ...json});
  }
}

export const userConverter: FirestoreDataConverter<UserSchema> = {
  toFirestore(user: WithFieldValue<UserSchema>): DocumentData {
    return UserSchema.toJson(user);
  },
  fromFirestore(snapshot: DocumentSnapshot, options: SnapshotOptions): UserSchema {
    const data = {...snapshot.data(options)!, id: snapshot.id} as IUserDocument;
    return new UserSchema(data);
  },
};
