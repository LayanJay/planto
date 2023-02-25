/**
 * Wraps a question document to make accessing attributes easier
 */
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from '@firebase/firestore';
import {FirebaseUtils} from '../utils/firebase-utils';
import {DocumentBasedSchema, IDocumentBase} from './document-based-schema';
import {ProductLineItemDataPointer} from './product-schema';
import {UserDataPointer} from './user-schema';

export interface ICartDocument extends IDocumentBase {
  total_items: number;
  total_unique_items: number;
  subtotal: number;
  line_items: ProductLineItemDataPointer[];
  owner: UserDataPointer;
}

export class CartSchema extends DocumentBasedSchema implements ICartDocument {
  readonly total_items: number;
  readonly total_unique_items: number;
  readonly subtotal: number;
  readonly line_items: ProductLineItemDataPointer[];
  readonly owner: UserDataPointer;
  static readonly TOTAL_ITEMS: 'total_items';
  static readonly TOTAL_UNIQUE_ITEMS: 'total_unique_items';
  static readonly SUBTOTAL: 'subtotal';
  static readonly LINE_ITEMS: 'line_items';
  static readonly OWNER: 'owner';

  public constructor(doc: ICartDocument) {
    super(doc);
    this.total_items = doc.total_items;
    this.total_unique_items = doc.total_unique_items;
    this.subtotal = doc.subtotal;
    this.line_items = doc.line_items;
    this.owner = doc.owner;
  }

  public static toJson(doc: CartSchema | WithFieldValue<CartSchema>) {
    return {
      [CartSchema.TOTAL_ITEMS]: doc.total_items,
      [CartSchema.LINE_ITEMS]: doc.line_items,
      [CartSchema.TOTAL_UNIQUE_ITEMS]: doc.total_unique_items,
      [CartSchema.SUBTOTAL]: doc.subtotal,
      [CartSchema.OWNER]: doc.owner,
      [CartSchema.CREATED]: doc.created,
      [CartSchema.MODIFIED]: doc.modified,
    };
  }

  public static createDocFromJson(
    json: Omit<ICartDocument, 'id' | 'created' | 'modified'> &
      Partial<Pick<ICartDocument, 'created' | 'modified'>>
  ): CartSchema {
    return new CartSchema({id: null, ...FirebaseUtils.getCreatedTimestamp(), ...json});
  }
}

export const cartConverter: FirestoreDataConverter<CartSchema> = {
  toFirestore(cart: WithFieldValue<CartSchema>): DocumentData {
    return CartSchema.toJson(cart);
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): CartSchema {
    const data = {...snapshot.data(options)!, id: snapshot.id} as ICartDocument;
    return new CartSchema(data);
  },
};
