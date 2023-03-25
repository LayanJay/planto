import { useAuthState } from '@skillnation/react-native-firebase-hooks/auth';
import { useCollection } from '@skillnation/react-native-firebase-hooks/firestore';
import { auth, db } from '../../config/firebase-config';
import { ProductSchema } from '../../schemas/product-schema';
import { FirestoreCollections } from '../../utils/firebase-utils';

interface UserProducts {
  products: ProductSchema[];
  loading: boolean;
  error: Error | undefined;
  count: number;
}

export const useUserProducts = (): UserProducts => {
  const [authUser, authUserLoading] = useAuthState(auth);
  const [products, productsLoading, productsError] = useCollection(
    !authUserLoading && authUser
      ? db().collection(FirestoreCollections.PRODUCTS).where('author.id', '==', authUser.uid)
      : null
  );

  return {
    products: products && !products.empty ? products.docs.map((doc) => new ProductSchema(doc)) : [],
    loading: authUserLoading || productsLoading,
    error: productsError,
    count: products?.size ?? 0,
  };
};
