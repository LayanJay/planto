import { useAuthState } from '@skillnation/react-native-firebase-hooks/auth';
import { useCollection } from '@skillnation/react-native-firebase-hooks/firestore';
import { auth, db } from '../../config/firebase-config';
import { ReviewSchema } from '../../schemas/review-schema';
import { FirestoreCollections } from '../../utils/firebase-utils';

interface UserReviews {
  reviews: ReviewSchema[];
  loading: boolean;
  error: Error | undefined;
  count: number;
}

export const useUserReviews = (): UserReviews => {
  const [authUser, authUserLoading] = useAuthState(auth);
  const [reviews, reviewsLoading, reviewsError] = useCollection(
    !authUserLoading && authUser
      ? db().collectionGroup(FirestoreCollections.REVIEWS).where('author.id', '==', authUser.uid)
      : null
  );

  return {
    reviews: reviews && !reviews.empty ? reviews.docs.map((doc) => new ReviewSchema(doc)) : [],
    loading: authUserLoading || reviewsLoading,
    error: reviewsError,
    count: reviews?.size ?? 0,
  };
};
