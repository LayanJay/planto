import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { FirebaseStorageTypes } from '@react-native-firebase/storage';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';
import { auth, db } from '../config/firebase-config';
import { UserRoles, UserSchema } from '../schemas/user-schema';

export abstract class FirebaseUtils {
  public static getCreatedTimestamp(): {
    created: FirebaseFirestoreTypes.Timestamp;
    modified: FirebaseFirestoreTypes.Timestamp;
  } {
    return {
      created: db.FieldValue.serverTimestamp() as FirebaseFirestoreTypes.Timestamp,
      modified: db.FieldValue.serverTimestamp() as FirebaseFirestoreTypes.Timestamp,
    };
  }

  public static getModifiedTimestamp(): { modified: FirebaseFirestoreTypes.Timestamp } {
    return {
      modified: db.FieldValue.serverTimestamp() as FirebaseFirestoreTypes.Timestamp,
    };
  }

  public static storageRefToPublicPath(ref: FirebaseStorageTypes.Reference): string {
    return `https://storage.googleapis.com/${ref.bucket}/${ref.fullPath}`;
  }
}

export class FirebaseAuthUtils extends FirebaseUtils {
  public static async signInWithGoogleProvider(): Promise<void> {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCred = await auth().signInWithCredential(googleCredential);
      if (userCred) {
        await FirebaseFirestoreUtils.createUserDocument(userCred);
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert(
          'Error!',
          error.message ?? 'Play services not available',
          [{ text: 'Try again' }],
          { cancelable: true }
        );
      } else {
        Alert.alert('Error!', 'Something went wrong! Try again later', [{ text: 'Try Later' }], {
          cancelable: true,
        });
      }
    }
  }
}

export class FirebaseFirestoreUtils extends FirebaseUtils {
  public static async createUserDocument(
    userCred: FirebaseAuthTypes.UserCredential
  ): Promise<void> {
    await db()
      .collection(FirestoreCollections.USERS)
      .doc(userCred.user.uid)
      .set(
        UserSchema.createDocFromJson({
          email: userCred.user.email,
          first_name: userCred.user.displayName?.split(' ')[0] ?? '',
          last_name: userCred.user.displayName?.split(' ')[1] ?? '',
          purchases: [],
          reviews: [],
          role: UserRoles.CUSTOMER,
          uid: userCred.user.uid,
        })
      );

    // TODO: remove later
    Alert.alert('Successful!', '', [{ text: 'Ok' }], { cancelable: true });
  }
}

export class FirestoreCollections {
  public static readonly USERS = 'users';
  public static readonly PRODUCTS = 'products';
  public static readonly QUESTIONS = 'questions';
  public static readonly CARTS = 'carts';
  public static readonly REVIEWS = 'reviews';
}
