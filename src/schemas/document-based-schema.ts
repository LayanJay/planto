/**
 * Base of all the DocumentSnapshot based models
 */

import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface IDocumentBase {
  id: string | null;
  created: FirebaseFirestoreTypes.Timestamp | null;
  modified: FirebaseFirestoreTypes.Timestamp | null;
}

export abstract class DocumentBasedSchema implements IDocumentBase {
  public static readonly ID: string = 'id';
  public static readonly CREATED: string = 'created';
  public static readonly MODIFIED: string = 'modified';
  readonly id: string | null;
  readonly created: FirebaseFirestoreTypes.Timestamp | null;
  readonly modified: FirebaseFirestoreTypes.Timestamp | null;

  public constructor(doc: FirebaseFirestoreTypes.DocumentData) {
    this.id = doc.id;
    this.created = doc.created;
    this.modified = doc.modified;
  }
}
