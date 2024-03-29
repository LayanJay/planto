/**
 * Wraps a review document to make accessing attributes easier
 */

import { DataPointer } from '../interfaces/data-pointer';
import { FirebaseUtils } from '../utils/firebase-utils';
import { DocumentBasedSchema, IDocumentBase } from './document-based-schema';
import { ProductDataPointer } from './product-schema';
import { UserDataPointer } from './user-schema';

export interface IReviewDocument extends IDocumentBase {
  text?: string;
  author: UserDataPointer;
  rating: number;
  product: ProductDataPointer;
}
export interface ReviewDataPointer extends DataPointer {
  text?: string;
  rating: number;
  product: ProductDataPointer;
}

export class ReviewSchema extends DocumentBasedSchema {
  static readonly TEXT: string = 'text';
  static readonly AUTHOR: string = 'author';
  static readonly RATING: string = 'rating';
  static readonly PRODUCT: string = 'product';

  public get text(): string {
    return this.doc.data()?.text;
  }
  public get author(): UserDataPointer {
    return this.doc.data()?.author;
  }
  public get rating(): number {
    return this.doc.data()?.rating;
  }
  public get product(): ProductDataPointer {
    return this.doc.data()?.product;
  }

  public toPointer(): ReviewDataPointer {
    return {
      id: this.id,
      text: this.text,
      rating: this.rating,
      product: this.product,
    };
  }

  public toJson(): IReviewDocument {
    return {
      id: this.id,
      text: this.text,
      author: this.author,
      rating: this.rating,
      product: this.product,
      created: this.created,
      modified: this.modified,
    };
  }

  public static createDocFromJson(
    json: Omit<IReviewDocument, 'id' | 'created' | 'modified'> &
      Partial<Pick<IReviewDocument, 'created' | 'modified'>>
  ) {
    return { ...FirebaseUtils.getCreatedTimestamp(), ...json };
  }

  public static updateDocFromJson(json: Partial<IReviewDocument>) {
    return { ...FirebaseUtils.getModifiedTimestamp(), ...json };
  }
}
