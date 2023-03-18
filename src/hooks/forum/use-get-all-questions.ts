// import { useAuthState } from '@skillnation/react-native-firebase-hooks/lib/typescript/auth';
import { useCollection } from '@skillnation/react-native-firebase-hooks/lib/typescript/firestore';
import { db } from '../../config/firebase-config';
import { QuestionSchema } from '../../schemas/question-schema';
import { FirestoreCollections } from '../../utils/firebase-utils';

export const useGetAllQuestions = (): {
  questions: QuestionSchema[];
  loading: boolean;
  error: Error | undefined;
} => {
  // const [authUser, authUserLoading, authUserError] = useAuthState(auth);
  const [questions, questionsLoading, questionsError] = useCollection(
    db().collection(FirestoreCollections.QUESTIONS)
  );
  return {
    questions:
      questions && !questions.empty ? questions.docs.map((doc) => new QuestionSchema(doc)) : [],
    loading: questionsLoading,
    error: questionsError,
  };
};
