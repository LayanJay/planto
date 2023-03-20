import { useDocument } from '@skillnation/react-native-firebase-hooks/firestore';
import { db } from '../../config/firebase-config';
import { ProductSchema } from '../../schemas/product-schema';
import { FirestoreCollections } from '../../utils/firebase-utils';

export function useGetProduct(id: string): {
  loading: boolean;
  error: Error | undefined;
  product: ProductSchema | null;
} {
  const [product, loading, error] = useDocument(
    db().collection(FirestoreCollections.PRODUCTS).doc(id)
  );

  return {
    product: product ? new ProductSchema(product) : null,
    loading,
    error,
  };
}
