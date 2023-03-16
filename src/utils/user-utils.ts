import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';
import { auth, db } from '../config/firebase-config';
import { IUserDocument, UserRoles, UserSchema } from '../schemas/user-schema';
import { FirebaseUtils, FirestoreCollections } from './firebase-utils';

export class UserUtils extends FirebaseUtils {
  public static async signInWithGoogleProvider(): Promise<void> {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCred = await auth().signInWithCredential(googleCredential);
      if (userCred) {
        await this.createUserDocument(userCred);
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

  public static async updateUserAccount(change: Partial<IUserDocument>): Promise<void> {
    // we let users to update their name only
    const currentUser = auth().currentUser;
    if (!currentUser) {
      Alert.alert(
        'Error!',
        "User not authenticated. Couldn't update the account",
        [{ text: 'Okay' }],
        {
          cancelable: true,
        }
      );
      return;
    }
    await this.updateUserDocument(currentUser.uid, {
      first_name: change.first_name,
      last_name: change.last_name,
    });
    await currentUser.updateProfile({
      displayName: `${change.first_name} ${change.last_name}`,
    });
    await currentUser.reload();
  }

  public static async deleteUserAccount(): Promise<void> {
    const currentUser = auth().currentUser;
    if (!currentUser) {
      Alert.alert(
        'Error!',
        "User not authenticated. Couldn't delete the account",
        [{ text: 'Okay' }],
        {
          cancelable: true,
        }
      );
      return;
    }

    Promise.all([await this.deleteUserDocuments(currentUser.uid), await currentUser.delete()]);
  }

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

  public static async updateUserDocument(
    userId: string,
    change: Partial<IUserDocument>
  ): Promise<void> {
    await db()
      .collection(FirestoreCollections.USERS)
      .doc(userId)
      .update(
        UserSchema.updateDocFromJson({
          ...change,
        })
      );
  }

  public static async deleteUserDocuments(userId: string): Promise<void> {
    const batch = db().batch();
    const userCartsDocs = await db()
      .collection(FirestoreCollections.CARTS)
      .where('owner.id', '==', userId)
      .get();
    // const userProductsSubReviewsDocs = await db()
    //   .collectionGroup(FirestoreCollections.REVIEWS)
    //   .where('product.seller.id', '==', userId)
    //   .get();
    const userProductsDocs = await db()
      .collection(FirestoreCollections.PRODUCTS)
      .where('seller.id', '==', userId)
      .get();
    const userQuestionsDocs = await db().collection(FirestoreCollections.QUESTIONS).get();
    const userDoc = await db().collection(FirestoreCollections.USERS).doc(userId).get();

    userCartsDocs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    // userProductsSubReviewsDocs.forEach((doc) => {
    //   batch.delete(doc.ref);
    // });
    userProductsDocs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    userQuestionsDocs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    batch.delete(userDoc.ref);

    await batch.commit();
  }
}
