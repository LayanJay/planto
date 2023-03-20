import { useCollection } from '@skillnation/react-native-firebase-hooks/firestore';
import { db } from '../../config/firebase-config';
import { ReviewSchema } from '../../schemas/review-schema';
import { FirestoreCollections } from '../../utils/firebase-utils';

export function useGetReviewByUser(
  product_id: string,
  uid: string
): {
  loading: boolean;
  error: Error | undefined;
  review: ReviewSchema | null;
  exists: boolean;
} {
  const [review, loading, error] = useCollection(
    uid && product_id
      ? db()
          .collection(FirestoreCollections.PRODUCTS)
          .doc(product_id)
          .collection(FirestoreCollections.REVIEWS)
          .where('author.id', '==', uid)
      : null
  );

  return {
    review: review ? new ReviewSchema(review.docs[0]) : null,
    loading,
    error,
    exists: review && review.size > 0 ? true : false,
  };
}
