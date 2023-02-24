import {doc, FirestoreError} from '@firebase/firestore';
import {User} from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import {auth, db} from '../config/firebase-config';
import {userConverter, UserSchema} from '../schemas/user-schema';
import {FirestoreCollections} from '../utils/firebase-utils';

interface Props {
  fetchUserDoc: boolean;
}

export function useCurrentUser({fetchUserDoc = false}: Props): {
  userError: FirestoreError | undefined;
  userLoading: boolean;
  authUserError: Error | undefined;
  authUser: User | null;
  user: UserSchema | null;
  authUserLoading: boolean;
} {
  const [authUser, authUserLoading, authUserError] = useAuthState(auth);
  const [user, userLoading, userError] = useDocumentData<UserSchema>(
    fetchUserDoc
      ? doc(db, `${FirestoreCollections.USERS}/${authUser?.uid}`).withConverter(userConverter)
      : null
  );
  return {
    authUser: authUser ?? null,
    user: user ?? null,
    authUserLoading,
    authUserError,
    userLoading,
    userError,
  };
}
