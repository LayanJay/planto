import { useDocument } from '@skillnation/react-native-firebase-hooks/firestore';
import { db } from '../../config/firebase-config';
import { QuestionSchema } from '../../schemas/question-schema';
import { FirestoreCollections } from '../../utils/firebase-utils';

export const useGetQuestion = (
  question_id: string
): {
  question: QuestionSchema | null;
  loading: boolean;
  error: Error | undefined;
} => {
  const [question, loading, error] = useDocument(
    db().collection(FirestoreCollections.QUESTIONS).doc(question_id)
  );

  return {
    question: question ? new QuestionSchema(question) : null,
    loading,
    error,
  };
};
