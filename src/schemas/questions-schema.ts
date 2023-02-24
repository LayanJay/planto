/**
 * Wraps a question document to make accessing attributes easier
 */
import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
  WithFieldValue,
} from '@firebase/firestore';
import {DocumentBasedSchema, IDocumentBase} from './document-based-schema';
import {UserDataPointer} from './user-schema';

export interface IQuestionDocument extends IDocumentBase {
  title: string | null;
  question: string | null;
  votes: number;
  is_answered: boolean;
  author: UserDataPointer;
  answers: AnswersDataPointer;
}

export interface QuestionDataPointer {
  id: string;
  title: string | null;
  votes: number;
}

export interface AnswersDataPointer {
  text: string | null;
  answered_by: UserDataPointer | null;
  created_at: Timestamp | null;
}

export class QuestionSchema extends DocumentBasedSchema {
  static readonly TITLE: string = 'title';
  static readonly QUESTION: string = 'question';
  static readonly VOTES: string = 'votes';
  static readonly ISANSWERED: string = 'is_answered';
  static readonly AUTHOR: string = 'author';
  static readonly ANSWERS: string = 'answers';

  public get title(): string | null {
    return this.doc.get(QuestionSchema.TITLE) ?? null;
  }

  public get question(): string | null {
    return this.doc.get(QuestionSchema.QUESTION) ?? null;
  }

  public get votes(): number {
    return this.doc.get(QuestionSchema.VOTES) ?? 0;
  }

  public get is_answered(): boolean {
    return this.doc.get(QuestionSchema.ISANSWERED) ?? false;
  }

  public get author(): UserDataPointer | null {
    return this.doc.get(QuestionSchema.AUTHOR) ?? null;
  }

  public get answers(): Array<AnswersDataPointer> {
    return this.doc.get(QuestionSchema.ANSWERS) ?? [];
  }

  public toPointer(): QuestionDataPointer {
    return {
      id: this.id,
      title: this.title,
      votes: this.votes,
    };
  }
}

export const questionConverter = {
  toFirestore(post: WithFieldValue<IQuestionDocument>): DocumentData {
    return post;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): QuestionSchema {
    return new QuestionSchema(snapshot);
  },
};
