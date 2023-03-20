/**
 * Wraps a user document to make accessing attributes easier
 */

import { DataPointer } from '../interfaces/data-pointer';
import { FirebaseUtils } from '../utils/firebase-utils';
import { DocumentBasedSchema, IDocumentBase } from './document-based-schema';

export interface IUserDocument extends IDocumentBase {
  uid: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  role: UserRoles;
  address: string | null;
}
export interface UserDataPointer extends DataPointer {
  first_name: string | null;
  last_name: string | null;
}

export const enum UserRoles {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}
export class UserSchema extends DocumentBasedSchema {
  static readonly UID: string = 'uid';
  static readonly FIRST_NAME: string = 'first_name';
  static readonly LAST_NAME: string = 'last_name';
  static readonly EMAIL: string = 'email';
  static readonly ROLE: string = 'role';
  static readonly ADDRESS: string = 'address';

  public get uid(): string {
    return this.doc.data()?.uid ?? this.doc.id;
  }
  public get first_name(): string | null {
    return this.doc.data()?.first_name ?? null;
  }
  public get last_name(): string | null {
    return this.doc.data()?.last_name ?? null;
  }
  public get email(): string | null {
    return this.doc.data()?.email ?? null;
  }
  public get role(): UserRoles {
    return this.doc.data()?.role ?? '';
  }
  public get address(): string | null {
    return this.doc.data()?.address ?? '';
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
      id: this.id,
      uid: this.uid,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      role: this.role,
      address: this.address,
      created: this.created,
      modified: this.modified,
    };
  }

  public static createDocFromJson(
    json: Omit<IUserDocument, 'id' | 'created' | 'modified'> &
      Partial<Pick<IUserDocument, 'created' | 'modified'>>
  ) {
    return { ...FirebaseUtils.getCreatedTimestamp(), ...json };
  }

  public static updateDocFromJson(json: Partial<IUserDocument>) {
    return { ...FirebaseUtils.getModifiedTimestamp(), ...json };
  }
}
