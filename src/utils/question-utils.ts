import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/firestore';
import { auth, db } from '../config/firebase-config';
import { AnswersDataPointer, IQuestionDocument, QuestionSchema } from '../schemas/question-schema';
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

  public static async updateAnswers(questionId: string, answer: AnswersDataPointer): Promise<void> {
    try {
      await db()
        .collection(FirestoreCollections.QUESTIONS)
        .doc(questionId)
        .update({
          [QuestionSchema.ANSWERS]: firebase.firestore.FieldValue.arrayUnion(answer),
        });
    } catch (error) {
      console.log(`Failed to update answers for question ${questionId}: ${error}`);
    }
  }

  public static async updateVotes(
    questionId: string,
    userId: string,
    action: string
  ): Promise<void> {
    const questionRef = db().collection(FirestoreCollections.QUESTIONS).doc(questionId);
    let question = new QuestionSchema(await questionRef.get());

    let votes = question.votes;
    const index = votes.indexOf(userId);

    if (action === 'add') {
      if (index < 0) {
        votes.push(userId);
      }
    } else if (action === 'remove') {
      if (index >= 0) {
        votes = votes.filter((vote) => vote != userId);
      }
    }

    await db().collection(FirestoreCollections.QUESTIONS).doc(questionId).update({ votes });
  }

  public static checkUser(): FirebaseAuthTypes.User {
    const currentUser = auth().currentUser;
    if (!currentUser) throw new Error(`User not authenticated.`);
    return currentUser;
  }
}
