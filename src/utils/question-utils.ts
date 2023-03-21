import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { auth, db } from '../config/firebase-config';
import { IQuestionDocument, QuestionSchema } from '../schemas/question-schema';
import { FirebaseUtils, FirestoreCollections } from './firebase-utils';

export class QuestionUtils extends FirebaseUtils {
  public static async createQuestion(
    params: Pick<IQuestionDocument, 'title' | 'question'>
  ): Promise<void> {
    const currentUser = this.checkUser();
    await db()
      .collection(FirestoreCollections.QUESTIONS)
      .add(
        QuestionSchema.createDocFromJson({
          title: params.title,
          question: params.question,
          votes: [],
          is_answered: false,
          author: {
            id: currentUser.uid,
            first_name: currentUser?.displayName?.split(' ')[0] ?? '',
            last_name: currentUser?.displayName?.split(' ')[1] ?? '',
          },
          answers: [],
        })
      );
  }

  public static async deleteQuestion(id: string): Promise<void> {
    await db().collection(FirestoreCollections.QUESTIONS).doc(id).delete();
  }

  // public static async addAnswer(params: AnswersDataPointer, id: string): Promise<void> {
  //   const questionRef = db().collection(FirestoreCollections.QUESTIONS).doc(id);
  //   let question = new QuestionSchema(await questionRef.get());
  //   const newAnswer: AnswersDataPointer[]= question.answers;
  // }

  public static checkUser(): FirebaseAuthTypes.User {
    const currentUser = auth().currentUser;
    if (!currentUser) throw new Error(`User not authenticated.`);
    return currentUser;
  }
}
