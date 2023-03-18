import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { FirebaseStorageTypes } from '@react-native-firebase/storage';
import { db } from '../config/firebase-config';

export abstract class FirebaseUtils {
  public static getCreatedTimestamp(): {
    created: FirebaseFirestoreTypes.Timestamp;
    modified: FirebaseFirestoreTypes.Timestamp;
  } {
    return {
      created: db.FieldValue.serverTimestamp() as FirebaseFirestoreTypes.Timestamp,
      modified: db.FieldValue.serverTimestamp() as FirebaseFirestoreTypes.Timestamp,
    };
  }

  public static getModifiedTimestamp(): { modified: FirebaseFirestoreTypes.Timestamp } {
    return {
      modified: db.FieldValue.serverTimestamp() as FirebaseFirestoreTypes.Timestamp,
    };
  }

  public static storageRefToPublicPath(ref: FirebaseStorageTypes.Reference): string {
    return `https://storage.googleapis.com/${ref.bucket}/${ref.fullPath}`;
  }
}

export class FirestoreCollections {
  public static readonly USERS = 'users';
  public static readonly PRODUCTS = 'products';
  public static readonly QUESTIONS = 'questions';
  public static readonly CARTS = 'carts';
  public static readonly REVIEWS = 'reviews';
  public static readonly PURCHASES = 'purchases';
}
