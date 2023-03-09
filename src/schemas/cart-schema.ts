/**
 * Wraps a question document to make accessing attributes easier
 */

import { FirebaseUtils } from '../utils/firebase-utils';
import { DocumentBasedSchema, IDocumentBase } from './document-based-schema';
import { ProductLineItemDataPointer } from './product-schema';
import { UserDataPointer } from './user-schema';

export interface ICartDocument extends IDocumentBase {
  total_items: number;
  total_unique_items: number;
  subtotal: number;
  line_items: ProductLineItemDataPointer[];
  owner: UserDataPointer;
}

export class CartSchema extends DocumentBasedSchema {
  static readonly TOTAL_ITEMS: 'total_items';
  static readonly TOTAL_UNIQUE_ITEMS: 'total_unique_items';
  static readonly SUBTOTAL: 'subtotal';
  static readonly LINE_ITEMS: 'line_items';
  static readonly OWNER: 'owner';

  public get total_items(): number {
    return this.doc.get(CartSchema.TOTAL_ITEMS) ?? 0;
  }
  public get total_unique_items(): number {
    return this.doc.get(CartSchema.TOTAL_UNIQUE_ITEMS) ?? 0;
  }
  public get subtotal(): number {
    return this.doc.get(CartSchema.SUBTOTAL) ?? 0;
  }
  public get line_items(): ProductLineItemDataPointer[] {
    return this.doc.data()?.[CartSchema.LINE_ITEMS] ?? [];
  }
  public get owner(): UserDataPointer {
    return this.doc.data()?.[CartSchema.OWNER];
  }

  public toJson(): ICartDocument {
    return {
      id: this.id,
      total_items: this.total_items,
      line_items: this.line_items,
      total_unique_items: this.total_unique_items,
      subtotal: this.subtotal,
      owner: this.owner,
      created: this.created,
      modified: this.modified,
    };
  }

  public static createDocFromJson(
    json: Omit<ICartDocument, 'id' | 'created' | 'modified'> &
      Partial<Pick<ICartDocument, 'created' | 'modified'>>
  ) {
    return { ...FirebaseUtils.getCreatedTimestamp(), ...json };
  }
}
