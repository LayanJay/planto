/**
 * Wraps a product document to make accessing attributes easier
 */
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from '@firebase/firestore';
import {DocumentBasedSchema} from './document-based-schema';

export enum CategoryType {
  Outdoor = 'outdoor',
  Indoor = 'indoor',
}

export interface ProductDataPointer {
  id: string;
  name: string | null;
  price: string | null;
}

export class ProductSchema extends DocumentBasedSchema {
  static readonly NAME: string = 'name';
  static readonly DESCRIPTION: string = 'description';
  static readonly PRICE: string = 'price';
  static readonly CATEGORY: string = 'category';
  static readonly IMAGE: string = 'image';
  static readonly INVENTORY: string = 'inventory';

  public get name(): string | null {
    return this.doc.get(ProductSchema.NAME) ?? null;
  }

  public get description(): string | null {
    return this.doc.get(ProductSchema.DESCRIPTION) ?? null;
  }

  public get price(): string | null {
    return this.doc.get(ProductSchema.PRICE) ?? null;
  }

  public get category(): CategoryType[] {
    return this.doc.get(ProductSchema.CATEGORY) ?? [];
  }

  public get image(): string | null {
    return this.doc.get(ProductSchema.IMAGE) ?? null;
  }

  public get inventory(): number {
    return this.doc.get(ProductSchema.INVENTORY) ?? 0;
  }

  public toPointer(): ProductDataPointer {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
    };
  }
}

export const productsConverter: FirestoreDataConverter<ProductSchema> = {
  toFirestore(post: WithFieldValue<ProductSchema>): DocumentData {
    return post;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ProductSchema {
    return new ProductSchema(snapshot);
  },
};
