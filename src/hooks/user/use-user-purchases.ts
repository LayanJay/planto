import { useAuthState } from '@skillnation/react-native-firebase-hooks/auth';
import { useCollection } from '@skillnation/react-native-firebase-hooks/firestore';
import { auth, db } from '../../config/firebase-config';
import { CartSchema } from '../../schemas/cart-schema';
import { FirestoreCollections } from '../../utils/firebase-utils';

export const useUserPurchases = (): {
  purchases: CartSchema[];
  loading: boolean;
  error: Error | undefined;
  count: number;
} => {
  const [authUser, authUserLoading, authUserError] = useAuthState(auth);
  const [purchases, purchasesLoading, purchasesError] = useCollection(
    !authUserLoading && authUser
      ? db()
          .collection(FirestoreCollections.USERS)
          .doc(authUser.uid)
          .collection(FirestoreCollections.PURCHASES)
      : null
  );

  // structure of a purchase follows the structure of the cart schema
  return {
    purchases:
      purchases && !purchases.empty ? purchases.docs.map((doc) => new CartSchema(doc)) : [],
    loading: authUserLoading || purchasesLoading,
    error: authUserError || purchasesError,
    count: purchases?.size ?? 0,
  };
};
