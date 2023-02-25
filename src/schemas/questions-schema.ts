/**
 * Wraps a question document to make accessing attributes easier
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

export interface IQuestionDocument extends IDocumentBase {
  title: string;
  question: string;
  votes: number;
  is_answered: boolean;
  author: UserDataPointer;
  answers: AnswersDataPointer;
}

export interface QuestionDataPointer extends DataPointer {
  title: string;
  votes: number;
}

export interface AnswersDataPointer {
  text: string;
  answered_by: UserDataPointer;
  created_at: Timestamp;
}

export class QuestionSchema extends DocumentBasedSchema implements IQuestionDocument {
  readonly title: string;
  readonly question: string;
  readonly votes: number;
  readonly is_answered: boolean;
  readonly author: UserDataPointer;
  readonly answers: AnswersDataPointer;
  static readonly TITLE: string = 'title';
  static readonly QUESTION: string = 'question';
  static readonly VOTES: string = 'votes';
  static readonly ISANSWERED: string = 'is_answered';
  static readonly AUTHOR: string = 'author';
  static readonly ANSWERS: string = 'answers';

  public constructor(doc: IQuestionDocument) {
    super(doc);
    this.title = doc.title;
    this.question = doc.question;
    this.votes = doc.votes;
    this.is_answered = doc.is_answered;
    this.author = doc.author;
    this.answers = doc.answers;
  }

  public toPointer(): QuestionDataPointer {
    return {
      id: this.id,
      title: this.title,
      votes: this.votes,
    };
  }

  public static toJson(doc: QuestionSchema | WithFieldValue<QuestionSchema>) {
    return {
      [QuestionSchema.TITLE]: doc.title,
      [QuestionSchema.QUESTION]: doc.question,
      [QuestionSchema.VOTES]: doc.votes,
      [QuestionSchema.ISANSWERED]: doc.is_answered,
      [QuestionSchema.AUTHOR]: doc.author,
      [QuestionSchema.ANSWERS]: doc.answers,
      [QuestionSchema.CREATED]: doc.created,
      [QuestionSchema.MODIFIED]: doc.modified,
    };
  }

  public static createDocFromJson(
    json: Omit<IQuestionDocument, 'id' | 'created' | 'modified'> &
      Partial<Pick<IQuestionDocument, 'created' | 'modified'>>
  ): QuestionSchema {
    return new QuestionSchema({id: null, ...FirebaseUtils.getCreatedTimestamp(), ...json});
  }
}

export const questionConverter: FirestoreDataConverter<QuestionSchema> = {
  toFirestore(question: WithFieldValue<QuestionSchema>): DocumentData {
    return QuestionSchema.toJson(question);
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): QuestionSchema {
    const data = {...snapshot.data(options)!, id: snapshot.id} as IQuestionDocument;
    return new QuestionSchema(data);
  },
};
