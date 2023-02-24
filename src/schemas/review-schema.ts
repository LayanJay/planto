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
import {DocumentBasedSchema} from './document-based-schema';
import {UserDataPointer} from './user-schema';

export interface ReviewDataPointer {
  id: string;
  title: string | null;
  rating: number;
}

export class ReviewSchema extends DocumentBasedSchema {
  static readonly TITLE: string = 'title';
  static readonly TEXT: string = 'text';
  static readonly AUTHOR: string = 'author';
  static readonly RATING: string = 'rating';

  public get title(): string | null {
    return this.doc.get(ReviewSchema.TITLE) ?? null;
  }

  public get text(): string | null {
    return this.doc.get(ReviewSchema.TEXT) ?? null;
  }

  public get author(): UserDataPointer | null {
    return this.doc.get(ReviewSchema.AUTHOR) ?? null;
  }

  public get rating(): number {
    return this.doc.get(ReviewSchema.RATING) ?? 0;
  }

  public toPointer(): ReviewDataPointer {
    return {
      id: this.id,
      title: this.title,
      rating: this.rating,
    };
  }
}

export const ReviewConverter: FirestoreDataConverter<ReviewSchema> = {
  toFirestore(post: WithFieldValue<ReviewSchema>): DocumentData {
    return post;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ReviewSchema {
    return new ReviewSchema(snapshot);
  },
};
