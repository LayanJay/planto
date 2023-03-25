import { useCollection } from '@skillnation/react-native-firebase-hooks/firestore';
import { db } from '../../config/firebase-config';
import { ReviewSchema } from '../../schemas/review-schema';
import { FirestoreCollections } from '../../utils/firebase-utils';

export function useListReviews(product_id: string): {
  loading: boolean;
  error: Error | undefined;
  reviews: ReviewSchema[] | null;
  count: number | null;
  averageRating: number | null;
} {
  const [reviews, loading, error] = useCollection(
    product_id
      ? db()
          .collection(FirestoreCollections.PRODUCTS)
          .doc(product_id)
          .collection(FirestoreCollections.REVIEWS)
      : null
  );

  return {
    reviews: reviews ? reviews.docs.map((doc) => new ReviewSchema(doc)) : [],
    loading,
    error,
    count: reviews ? reviews.size : null,
    averageRating:
      reviews && !reviews?.empty
        ? parseFloat(
            (
              reviews.docs.reduce((acc, obj) => {
                return acc + parseInt(obj.get('rating') as string);
              }, 0) / reviews.size
            ).toFixed(2)
          )
        : 0.0,
  };
}
