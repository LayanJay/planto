/**
 * Wraps a user document to make accessing attributes easier
 */

import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { DataPointer } from '../interfaces/data-pointer';
import { FirebaseUtils } from '../utils/firebase-utils';
import { DocumentBasedSchema, IDocumentBase } from './document-based-schema';
import { ProductPurchasedDataPointer } from './product-schema';
import { ReviewDataPointer } from './review-schema';

export interface IUserDocument extends IDocumentBase {
  uid: string;
  first_name?: string;
  last_name?: string;
  email: string | null;
  role: UserRoles;
  purchases: Array<ProductPurchasedDataPointer>;
  reviews: Array<ReviewDataPointer>;
}
export interface UserDataPointer extends DataPointer {
  first_name: string;
  last_name: string;
}

export const enum UserRoles {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}
export class UserSchema extends DocumentBasedSchema implements IUserDocument {
  readonly uid: string;
  readonly first_name?: string;
  readonly last_name?: string;
  readonly email: string | null;
  readonly role: UserRoles;
  readonly purchases: ProductPurchasedDataPointer[];
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
    this.first_name = doc.first_name ?? '';
    this.last_name = doc.last_name ?? '';
    this.email = doc.email;
    this.role = doc.role;
    this.purchases = doc.purchases;
    this.reviews = doc.reviews;
  }

  public toPointer(): UserDataPointer {
    return {
      id: this.id,
      first_name: this.first_name ?? '',
      last_name: this.last_name ?? '',
    };
  }

  public toJson() {
    return {
      [UserSchema.UID]: this.uid,
      [UserSchema.FIRST_NAME]: this.first_name ?? '',
      [UserSchema.LAST_NAME]: this.last_name ?? '',
      [UserSchema.EMAIL]: this.email,
      [UserSchema.ROLE]: this.role,
      [UserSchema.PURCHASES]: this.purchases,
      [UserSchema.REVIEWS]: this.reviews,
      [UserSchema.CREATED]: this.created,
      [UserSchema.MODIFIED]: this.modified,
    };
  }

  public static createDocFromJson(
    json: Omit<IUserDocument, 'id' | 'created' | 'modified'> &
      Partial<Pick<IUserDocument, 'created' | 'modified'>>
  ): {
    [x: string]:
      | string
      | ProductPurchasedDataPointer[]
      | ReviewDataPointer[]
      | FirebaseFirestoreTypes.Timestamp
      | null;
  } {
    return new UserSchema({ id: null, ...FirebaseUtils.getCreatedTimestamp(), ...json }).toJson();
  }
}
