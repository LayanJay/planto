import {serverTimestamp, Timestamp} from 'firebase/firestore';
import {StorageReference} from 'firebase/storage';

export abstract class FirebaseUtils {
  public static getCreatedTimestamp(): {created: Timestamp; modified: Timestamp} {
    return {
      created: serverTimestamp() as Timestamp,
      modified: serverTimestamp() as Timestamp,
    };
  }

  public static getModifiedTimestamp(): {modified: Timestamp} {
    return {
      modified: serverTimestamp() as Timestamp,
    };
  }

  public static storageRefToPublicPath(ref: StorageReference): string {
    return `https://storage.googleapis.com/${ref.bucket}/${ref.fullPath}`;
  }
}

export class FirestoreCollections {
  public static readonly USERS = 'users';
  public static readonly PRODUCTS = 'products';
}
