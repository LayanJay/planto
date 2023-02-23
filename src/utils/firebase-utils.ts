import {serverTimestamp} from 'firebase/firestore';
import {StorageReference} from 'firebase/storage';
import {Dict} from '../interfaces/dict';

export abstract class FirebaseUtils {
  public static getCreatedTimestamp(): Dict {
    return {
      created: serverTimestamp(),
      modified: serverTimestamp(),
    };
  }

  public static getModifiedTimestamp(): Dict {
    return {
      modified: serverTimestamp(),
    };
  }

  public static storageRefToPublicPath(ref: StorageReference): string {
    return `https://storage.googleapis.com/${ref.bucket}/${ref.fullPath}`;
  }
}
