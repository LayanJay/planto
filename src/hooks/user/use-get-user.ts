import { useDocument } from '@skillnation/react-native-firebase-hooks/firestore';
import { db } from '../../config/firebase-config';
import { UserSchema } from '../../schemas/user-schema';
import { FirestoreCollections } from '../../utils/firebase-utils';

export function useGetUser(id: string): {
  loading: boolean;
  error: Error | undefined;
  user: UserSchema | null;
  //   authUser: FirebaseAuthTypes.User | null;
} {
  const [user, loading, error] = useDocument(
    id ? db().collection(FirestoreCollections.USERS).doc(id) : null
  );

  return {
    user: user ? new UserSchema(user) : null,
    loading,
    error,
  };
}
