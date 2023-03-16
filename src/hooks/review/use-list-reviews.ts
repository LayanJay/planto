import { useCollection } from '@skillnation/react-native-firebase-hooks/firestore';
import { db } from '../../config/firebase-config';
import { ReviewSchema } from '../../schemas/review-schema';
import { FirestoreCollections } from '../../utils/firebase-utils';

export function useListReviews(product_id: string): {
  loading: boolean;
  error: Error | undefined;
  reviews: ReviewSchema[] | null;
} {
  const [reviews, loading, error] = useCollection(
    db()
      .collection(FirestoreCollections.PRODUCTS)
      .doc(product_id)
      .collection(FirestoreCollections.REVIEWS)
  );

  return {
    reviews: reviews ? reviews.docs.map((doc) => new ReviewSchema(doc)) : null,
    loading,
    error,
  };
}
