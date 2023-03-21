import { useAuthState } from '@skillnation/react-native-firebase-hooks/auth';
import { useDocument } from '@skillnation/react-native-firebase-hooks/firestore';
import { auth, db } from '../../config/firebase-config';
import { CartSchema } from '../../schemas/cart-schema';
import { FirestoreCollections } from '../../utils/firebase-utils';

export const useUserCart = (): {
  cart: CartSchema | null;
  loading: boolean;
  error: Error | undefined;
} => {
  const [authUser, authUserLoading, authUserError] = useAuthState(auth);
  const [cart, cartLoading, cartError] = useDocument(
    !authUserLoading && authUser
      ? db().collection(FirestoreCollections.CARTS).doc(authUser.uid)
      : null
  );

  // structure of a purchase follows the structure of the cart schema
  return {
    cart: cart && cart.exists ? new CartSchema(cart) : null,
    loading: authUserLoading || cartLoading,
    error: authUserError || cartError,
  };
};
