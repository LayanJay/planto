import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { auth, db } from '../config/firebase-config';
import { CheckoutResult } from '../interfaces/checkout-result';
import { CartSchema } from '../schemas/cart-schema';
import { FirebaseUtils, FirestoreCollections } from './firebase-utils';

export class CheckoutUtils extends FirebaseUtils {
  // create/initialize a checkout session
  public static async createCheckoutSession(): Promise<CheckoutResult> {
    const currentUser = this.checkUser();
    const userCartRef = db().collection(FirestoreCollections.CARTS).doc(currentUser.uid);
    let userCart = new CartSchema(await userCartRef.get());
    if (!userCart.exists)
      throw new Error(`User cart not found. Couldn't retrieve the checkout session`);

    const purchasedRef = db()
      .collection(FirestoreCollections.USERS)
      .doc(currentUser.uid)
      .collection(FirestoreCollections.PURCHASES);

    return await purchasedRef
      .add({
        ...userCart.toJson(),
        ...this.getCreatedTimestamp(),
      })
      .then(() => {
        return CheckoutResult.SUCCESS;
      })
      .catch(() => {
        return CheckoutResult.FAILED;
      });
  }

  public static checkUser(): FirebaseAuthTypes.User {
    const currentUser = auth().currentUser;
    if (!currentUser)
      throw new Error("User not authenticated. Couldn't retrieve the checkout session");
    return currentUser;
  }
}
