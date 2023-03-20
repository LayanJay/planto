import { useCollection } from '@skillnation/react-native-firebase-hooks/firestore';
import { db } from '../../config/firebase-config';
import { QuestionSchema } from '../../schemas/question-schema';
import { FirestoreCollections } from '../../utils/firebase-utils';

export const useAllQuestions = (): {
  questions: QuestionSchema[];
  loading: boolean;
  error: Error | undefined;
} => {
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
