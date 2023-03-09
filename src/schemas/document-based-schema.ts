/**
 * Base of all the DocumentSnapshot based models
 */

import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Dict } from '../interfaces/dict';

export interface IDocumentBase {
  id: string | null;
  created: FirebaseFirestoreTypes.Timestamp | null;
  modified: FirebaseFirestoreTypes.Timestamp | null;
}

export abstract class DocumentBasedSchema {
  public static readonly ID: string = 'id';
  public static readonly CREATED: string = 'created';
  public static readonly MODIFIED: string = 'modified';

  public constructor(protected readonly doc: FirebaseFirestoreTypes.DocumentSnapshot) {}

  get id(): string {
    return this.doc.id;
  }

  public get created(): FirebaseFirestoreTypes.Timestamp | null {
    return this.doc.get(DocumentBasedSchema.CREATED) ?? null;
  }

  public get modified(): FirebaseFirestoreTypes.Timestamp | null {
    return this.doc.get(DocumentBasedSchema.MODIFIED) ?? null;
  }

  get ref(): FirebaseFirestoreTypes.DocumentReference {
    return this.doc.ref;
  }

  get exists(): boolean {
    return this.doc.exists;
  }

  get rawData(): Dict | null {
    return this.doc.data() ?? null;
  }

  public async delete(): Promise<void> {
    if (!this.exists) return;
    await this.doc.ref.delete();
  }
}
