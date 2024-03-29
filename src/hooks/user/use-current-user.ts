import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useAuthState } from '@skillnation/react-native-firebase-hooks/auth';
import { useDocument } from '@skillnation/react-native-firebase-hooks/firestore';
import { auth, db } from '../../config/firebase-config';
import { UserSchema } from '../../schemas/user-schema';
import { FirestoreCollections } from '../../utils/firebase-utils';

export function useCurrentUser(fetchUserDoc = false): {
  userError: Error | undefined;
  userLoading: boolean;
  loading: boolean;
  error: Error | undefined;
  authUserError: Error | undefined;
  authUser: FirebaseAuthTypes.User | null;
  user: UserSchema | null;
  authUserLoading: boolean;
} {
  const [authUser, authUserLoading, authUserError] = useAuthState(auth);
  const [user, userLoading, userError] = useDocument(
    fetchUserDoc ? db().collection(FirestoreCollections.USERS).doc(authUser?.uid) : null
  );

  return {
    authUser: authUser ?? null,
    user: user ? new UserSchema(user) : null,
    loading: authUserLoading || userLoading,
    error: authUserError || userError,
    authUserLoading,
    authUserError,
    userLoading,
    userError,
  };
}
