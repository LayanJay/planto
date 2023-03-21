import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { auth, db } from '../config/firebase-config';
import { CheckoutResult } from '../interfaces/checkout-result';
import { CartSchema } from '../schemas/cart-schema';
import { ProductSchema } from '../schemas/product-schema';
import { CartUtils } from './cart-utils';
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

    await purchasedRef.add(
      CartSchema.createDocFromJson({ ...userCart.toJson(), ...this.getModifiedTimestamp() })
    );

    return await this.updateProductsInventory(userCart)
      .then(async () => {
        await CartUtils.createOrResetCart();
        return CheckoutResult.SUCCESS;
      })
      .catch(() => CheckoutResult.FAILED);
  }

  public static async updateProductsInventory(userCart: CartSchema): Promise<void> {
    if (!userCart.exists) throw new Error(`User cart not found`);

    const lineItems = userCart.line_items;
    if (lineItems.length === 0) return;

    lineItems.forEach(async (lineItem) => {
      const productRef = db().collection(FirestoreCollections.PRODUCTS).doc(lineItem.id);
      const product = new ProductSchema(await productRef.get());
      if (!product.exists) return;

      const newInventory = product.inventory - lineItem.quantity;
      if (newInventory < 0) return;

      await productRef.update(ProductSchema.updateDocFromJson({ inventory: newInventory }));
    });
  }

  public static checkUser(): FirebaseAuthTypes.User {
    const currentUser = auth().currentUser;
    if (!currentUser)
      throw new Error("User not authenticated. Couldn't retrieve the checkout session");
    return currentUser;
  }
}
