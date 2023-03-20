import { useDocument } from '@skillnation/react-native-firebase-hooks/firestore';
import { db } from '../../config/firebase-config';
import { ReviewSchema } from '../../schemas/review-schema';
import { FirestoreCollections } from '../../utils/firebase-utils';

export function useGetReview(
  product_id: string,
  review_id: string
): {
  loading: boolean;
  error: Error | undefined;
  review: ReviewSchema | null;
} {
  const [review, loading, error] = useDocument(
    product_id && review_id
      ? db()
          .collection(FirestoreCollections.PRODUCTS)
          .doc(product_id)
          .collection(FirestoreCollections.REVIEWS)
          .doc(review_id)
      : null
  );

  return {
    review: review ? new ReviewSchema(review) : null,
    loading,
    error,
  };
}
