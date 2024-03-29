/**
 * Wraps a product document to make accessing attributes easier
 */
import { DataPointer } from '../interfaces/data-pointer';
import { FirebaseUtils } from '../utils/firebase-utils';
import { DocumentBasedSchema, IDocumentBase } from './document-based-schema';
import { UserDataPointer } from './user-schema';

export enum CategoryType {
  Outdoor = 'outdoor',
  Indoor = 'indoor',
}

export interface IProductDocument extends IDocumentBase {
  name: string;
  description: string;
  price: string;
  category: CategoryType;
  image: string;
  inventory: number;
  seller: UserDataPointer;
}

export interface ProductDataPointer extends DataPointer {
  name: string;
  price: string;
  seller: UserDataPointer;
}

export interface ProductLineItemDataPointer extends DataPointer {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

export class ProductSchema extends DocumentBasedSchema {
  static readonly NAME: string = 'name';
  static readonly DESCRIPTION: string = 'description';
  static readonly PRICE: string = 'price';
  static readonly CATEGORY: string = 'category';
  static readonly IMAGE: string = 'image';
  static readonly INVENTORY: string = 'inventory';
  static readonly SELLER: string = 'seller';

  public get name(): string {
    return this.doc.data()?.name;
  }
  public get description(): string {
    return this.doc.data()?.description;
  }
  public get price(): string {
    return this.doc.data()?.price;
  }
  public get category(): CategoryType {
    return this.doc.data()?.category;
  }
  public get image(): string {
    return this.doc.data()?.image;
  }
  public get inventory(): number {
    return this.doc.data()?.inventory ?? 0;
  }
  public get seller(): UserDataPointer {
    return this.doc.data()?.seller;
  }

  public toPointer(): ProductDataPointer {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      seller: this.seller,
    };
  }

  public toLineItemPointer(): ProductLineItemDataPointer {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      quantity: 0,
      image: this.image,
    };
  }

  public toJson(): IProductDocument {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category,
      image: this.image,
      inventory: this.inventory,
      seller: this.seller,
      created: this.created,
      modified: this.modified,
    };
  }

  public static createDocFromJson(
    json: Omit<IProductDocument, 'id' | 'created' | 'modified'> &
      Partial<Pick<IProductDocument, 'created' | 'modified'>>
  ) {
    return { ...FirebaseUtils.getCreatedTimestamp(), ...json };
  }

  public static updateDocFromJson(json: Partial<IProductDocument>) {
    return { ...FirebaseUtils.getModifiedTimestamp(), ...json };
  }
}
