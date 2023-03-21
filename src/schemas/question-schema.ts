/**
 * Wraps a question document to make accessing attributes easier
 */
import { DataPointer } from '../interfaces/data-pointer';
import { FirebaseUtils } from '../utils/firebase-utils';
import { DocumentBasedSchema, IDocumentBase } from './document-based-schema';
import { UserDataPointer } from './user-schema';

export interface IQuestionDocument extends IDocumentBase {
  title: string;
  question: string;
  votes: Array<string>;
  is_answered: boolean;
  author: UserDataPointer;
  answers: AnswersDataPointer[];
}

export interface QuestionDataPointer extends DataPointer {
  title: string;
  votes: Array<string>;
}

export interface AnswersDataPointer extends DataPointer {
  text: string;
  answered_by: UserDataPointer;
  created_at: Date;
}

export class QuestionSchema extends DocumentBasedSchema {
  static readonly TITLE: string = 'title';
  static readonly QUESTION: string = 'question';
  static readonly VOTES: string = 'votes';
  static readonly ISANSWERED: string = 'is_answered';
  static readonly AUTHOR: string = 'author';
  static readonly ANSWERS: string = 'answers';

  public get title(): string {
    return this.doc.data()?.title;
  }
  public get question(): string {
    return this.doc.data()?.question;
  }
  public get votes(): Array<string> {
    return this.doc.data()?.votes;
  }
  public get is_answered(): boolean {
    return this.doc.data()?.is_answered;
  }
  public get author(): UserDataPointer {
    return this.doc.data()?.[QuestionSchema.AUTHOR];
  }
  public get answers(): AnswersDataPointer[] {
    return this.doc.data()?.[QuestionSchema.ANSWERS] ?? [];
  }

  public toPointer(): QuestionDataPointer {
    return {
      id: this.id,
      title: this.title,
      votes: this.votes,
    };
  }

  public toJson(): IQuestionDocument {
    return {
      id: this.id,
      title: this.title,
      question: this.question,
      votes: this.votes,
      is_answered: this.is_answered,
      author: this.author,
      answers: this.answers,
      created: this.created,
      modified: this.modified,
    };
  }

  public static createDocFromJson(
    json: Omit<IQuestionDocument, 'id' | 'created' | 'modified'> &
      Partial<Pick<IQuestionDocument, 'created' | 'modified'>>
  ) {
    return { ...FirebaseUtils.getCreatedTimestamp(), ...json };
  }

  public static updateDocFromJson(json: Partial<IQuestionDocument>) {
    return { ...FirebaseUtils.getModifiedTimestamp(), ...json };
  }
}
