import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import _ from 'lodash';
import { auth, db } from '../config/firebase-config';
import { CartSchema } from '../schemas/cart-schema';
import { ProductLineItemDataPointer } from '../schemas/product-schema';
import { FirebaseUtils, FirestoreCollections } from './firebase-utils';

export class CartUtils extends FirebaseUtils {
  // create/initialize a cart to the current user
  public static async createOrResetCart(): Promise<void> {
    const currentUser = this.checkUser();

    await db()
      .collection(FirestoreCollections.CARTS)
      .doc(currentUser.uid)
      .set(
        CartSchema.createDocFromJson({
          total_items: 0,
          total_unique_items: 0,
          subtotal: 0,
          line_items: [],
          owner: {
            id: currentUser.uid,
            first_name: currentUser?.displayName?.split(' ')[0] ?? '',
            last_name: currentUser?.displayName?.split(' ')[1] ?? '',
          },
        })
      );
  }

  // add to cart
  public static async addToCart(item: ProductLineItemDataPointer): Promise<void> {
    const currentUser = this.checkUser();
    const userCartRef = db().collection(FirestoreCollections.CARTS).doc(currentUser.uid);
    let userCart = new CartSchema(await userCartRef.get());
    if (!userCart.exists) {
      await this.createOrResetCart();
      userCart = new CartSchema(await userCartRef.get());
    }

    const newLineItems: ProductLineItemDataPointer[] = userCart.line_items;
    const lineItemIndex = _.findIndex(newLineItems, (lineItem) => item.id === lineItem.id);
    if (lineItemIndex === -1) {
      item.quantity = 1;
      newLineItems.push(item);
    } else {
      item.quantity = newLineItems[lineItemIndex].quantity + 1;
      _.set(newLineItems, `[${lineItemIndex}]`, item);
    }

    await this.updateCartDocument(userCartRef, newLineItems);
  }

  public static async updateCartItemQuantityById(id: string, quantity: number): Promise<void> {
    const currentUser = this.checkUser();
    const userCartRef = db().collection(FirestoreCollections.CARTS).doc(currentUser.uid);
    let userCart = new CartSchema(await userCartRef.get());
    if (!userCart.exists) throw new Error(`User cart not found`);

    const lineItemToBeUpdated = _.find(userCart.line_items, (lineItem) => lineItem.id === id);
    const lineItemIndexToBeUpdated = _.findIndex(
      userCart.line_items,
      (lineItem) => lineItem.id === id
    );
    if (!lineItemToBeUpdated || lineItemIndexToBeUpdated === -1)
      throw new Error(`Line item not found`);

    const newLineItems = userCart.line_items;
    lineItemToBeUpdated.quantity = _.clamp(lineItemToBeUpdated.quantity + quantity, 0, 999);
    _.set(newLineItems, `[${lineItemIndexToBeUpdated}]`, lineItemToBeUpdated);

    await this.updateCartDocument(userCartRef, newLineItems);
  }

  // delete a cart item
  public static async deleteCartItemById(id: string): Promise<void> {
    const currentUser = this.checkUser();
    const userCartRef = db().collection(FirestoreCollections.CARTS).doc(currentUser.uid);
    let userCart = new CartSchema(await userCartRef.get());
    if (!userCart.exists) throw new Error(`User cart not found`);

    const newLineItems: ProductLineItemDataPointer[] = userCart.line_items.filter(
      (lineItem) => lineItem.id !== id
    );

    await this.updateCartDocument(userCartRef, newLineItems);
  }

  public static async updateCartDocument(
    userCartRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>,
    newLineItems: ProductLineItemDataPointer[]
  ): Promise<void> {
    await userCartRef.update(
      CartSchema.updateDocFromJson({
        total_items: _.sum(newLineItems.map((lineItem) => lineItem.quantity)),
        total_unique_items: _.uniqBy(newLineItems, (ele) => ele.id).length,
        line_items: newLineItems,
        subtotal: _.sum(
          newLineItems.map((lineItem) => parseFloat(lineItem.price) * lineItem.quantity)
        ),
      })
    );
  }

  public static checkUser(): FirebaseAuthTypes.User {
    const currentUser = auth().currentUser;
    if (!currentUser) throw new Error(`User not authenticated. Couldn't retrieve the cart data`);
    return currentUser;
  }
}
