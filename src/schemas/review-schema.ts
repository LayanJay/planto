/**
 * Wraps a review document to make accessing attributes easier
 */
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from '@firebase/firestore';
import {DataPointer} from '../interfaces/data-pointer';
import {FirebaseUtils} from '../utils/firebase-utils';
import {DocumentBasedSchema, IDocumentBase} from './document-based-schema';
import {ProductDataPointer} from './product-schema';
import {UserDataPointer} from './user-schema';

export interface IReviewDocument extends IDocumentBase {
  title: string;
  text: string;
  author: UserDataPointer;
  rating: number;
  product: ProductDataPointer;
}
export interface ReviewDataPointer extends DataPointer {
  title: string;
  rating: number;
  product: ProductDataPointer;
}

export class ReviewSchema extends DocumentBasedSchema implements IReviewDocument {
  static readonly TITLE: string = 'title';
  static readonly TEXT: string = 'text';
  static readonly AUTHOR: string = 'author';
  static readonly RATING: string = 'rating';
  static readonly PRODUCT: string = 'product';
  readonly title: string;
  readonly text: string;
  readonly author: UserDataPointer;
  readonly rating: number;
  readonly product: ProductDataPointer;

  public constructor(doc: IReviewDocument) {
    super(doc);
    this.title = doc.title;
    this.text = doc.text;
    this.author = doc.author;
    this.rating = doc.rating;
    this.product = doc.product;
  }

  public toPointer(): ReviewDataPointer {
    return {
      id: this.id,
      title: this.title,
      rating: this.rating,
      product: this.product,
    };
  }

  public static toJson(doc: ReviewSchema | WithFieldValue<ReviewSchema>) {
    return {
      [ReviewSchema.TITLE]: doc.title,
      [ReviewSchema.TEXT]: doc.text,
      [ReviewSchema.AUTHOR]: doc.author,
      [ReviewSchema.RATING]: doc.rating,
      [ReviewSchema.PRODUCT]: doc.product,
      [ReviewSchema.CREATED]: doc.created,
      [ReviewSchema.MODIFIED]: doc.modified,
    };
  }

  public static createDocFromJson(
    json: Omit<IReviewDocument, 'id' | 'created' | 'modified'> &
      Partial<Pick<IReviewDocument, 'created' | 'modified'>>
  ): ReviewSchema {
    return new ReviewSchema({id: null, ...FirebaseUtils.getCreatedTimestamp(), ...json});
  }
}

export const reviewConverter: FirestoreDataConverter<ReviewSchema> = {
  toFirestore(review: WithFieldValue<ReviewSchema>): DocumentData {
    return ReviewSchema.toJson(review);
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ReviewSchema {
    const data = {...snapshot.data(options)!, id: snapshot.id} as IReviewDocument;
    return new ReviewSchema(data);
  },
};
