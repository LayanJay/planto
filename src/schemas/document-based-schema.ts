import {Timestamp} from '@firebase/firestore';

/**
 * Base of all the DocumentSnapshot based models
 */

export interface IDocumentBase {
  id: string | null;
  created: Timestamp | null;
  modified: Timestamp | null;
}

export abstract class DocumentBasedSchema implements IDocumentBase {
  public static readonly ID: string = 'id';
  public static readonly CREATED: string = 'created';
  public static readonly MODIFIED: string = 'modified';
  readonly id: string | null;
  readonly created: Timestamp | null;
  readonly modified: Timestamp | null;

  public constructor(doc: IDocumentBase) {
    this.id = doc.id;
    this.created = doc.created;
    this.modified = doc.modified;
  }
}
