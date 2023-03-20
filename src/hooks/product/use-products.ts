import { useCollection } from '@skillnation/react-native-firebase-hooks/firestore';
import { db } from '../../config/firebase-config';
import { ProductSchema } from '../../schemas/product-schema';
import { FirestoreCollections } from '../../utils/firebase-utils';

export const useProducts = (): {
  products: ProductSchema[];
  loading: boolean;
  error: Error | undefined;
} => {
  const [products, productsLoading, productsError] = useCollection(
    db().collection(FirestoreCollections.PRODUCTS)
  );

  return {
    products: products && !products.empty ? products.docs.map((doc) => new ProductSchema(doc)) : [],
    loading: productsLoading,
    error: productsError,
  };
};
