/**
 * Wraps a product document to make accessing attributes easier
 */
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
  WithFieldValue,
} from '@firebase/firestore';
import {DataPointer} from '../interfaces/data-pointer';
import {FirebaseUtils} from '../utils/firebase-utils';
import {DocumentBasedSchema, IDocumentBase} from './document-based-schema';
import {UserDataPointer} from './user-schema';

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
  purchased_date: Timestamp;
}

export interface ProductLineItemDataPointer extends DataPointer {
  name: string;
  price: string;
  quantity: number;
  image: string;
}

export class ProductSchema extends DocumentBasedSchema implements IProductDocument {
  readonly name: string;
  readonly description: string;
  readonly price: string;
  readonly category: CategoryType;
  readonly image: string;
  readonly inventory: number;
  readonly seller: UserDataPointer;
  static readonly NAME: string = 'name';
  static readonly DESCRIPTION: string = 'description';
  static readonly PRICE: string = 'price';
  static readonly CATEGORY: string = 'category';
  static readonly IMAGE: string = 'image';
  static readonly INVENTORY: string = 'inventory';
  static readonly SELLER: string = 'seller';

  public constructor(doc: IProductDocument) {
    super(doc);
    this.name = doc.name;
    this.description = doc.description;
    this.price = doc.price;
    this.category = doc.category;
    this.image = doc.image;
    this.inventory = doc.inventory;
    this.seller = doc.seller;
  }

  public toPointer(): ProductDataPointer {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      purchased_date: FirebaseUtils.getCreatedTimestamp().created,
    };
  }

  public toLineItemPointer(quantity: number): ProductLineItemDataPointer {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      quantity: quantity,
      image: this.image,
    };
  }

  public static toJson(doc: ProductSchema | WithFieldValue<ProductSchema>) {
    return {
      [ProductSchema.NAME]: doc.name,
      [ProductSchema.DESCRIPTION]: doc.description,
      [ProductSchema.PRICE]: doc.price,
      [ProductSchema.CATEGORY]: doc.category,
      [ProductSchema.IMAGE]: doc.image,
      [ProductSchema.INVENTORY]: doc.inventory,
      [ProductSchema.SELLER]: doc.seller,
      [ProductSchema.CREATED]: doc.created,
      [ProductSchema.MODIFIED]: doc.modified,
    };
  }

  public static createDocFromJson(
    json: Omit<IProductDocument, 'id' | 'created' | 'modified'> &
      Partial<Pick<IProductDocument, 'created' | 'modified'>>
  ): ProductSchema {
    return new ProductSchema({id: null, ...FirebaseUtils.getCreatedTimestamp(), ...json});
  }
}

export const productsConverter: FirestoreDataConverter<ProductSchema> = {
  toFirestore(product: WithFieldValue<ProductSchema>): DocumentData {
    return ProductSchema.toJson(product);
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ProductSchema {
    const data = {...snapshot.data(options)!, id: snapshot.id} as IProductDocument;
    return new ProductSchema(data);
  },
};
