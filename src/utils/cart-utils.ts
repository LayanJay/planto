import _ from 'lodash';
import { Alert } from 'react-native';
import { auth, db } from '../config/firebase-config';
import { CartSchema } from '../schemas/cart-schema';
import { ProductLineItemDataPointer } from '../schemas/product-schema';
import { FirebaseUtils, FirestoreCollections } from './firebase-utils';

export class CartUtils extends FirebaseUtils {
  // create/initialize a cart to the current user
  public static async createCart(): Promise<void> {
    const currentUser = auth().currentUser;
    if (!currentUser) {
      Alert.alert('Error!', "User not authenticated. Couldn't create a cart.", [{ text: 'Okay' }], {
        cancelable: true,
      });
      return;
    }
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
    const currentUser = auth().currentUser;
    if (!currentUser) {
      Alert.alert('Error!', "User not authenticated. Couldn't create a cart.", [{ text: 'Okay' }], {
        cancelable: true,
      });
      return;
    }
    const userCartRef = db().collection(FirestoreCollections.CARTS).doc(currentUser.uid);
    let userCart = new CartSchema(await userCartRef.get());
    if (!userCart.exists) {
      await this.createCart();
      userCart = new CartSchema(await userCartRef.get());
    }

    const newLineItems: ProductLineItemDataPointer[] = userCart.line_items;
    const lineItemIndex = _.findIndex(newLineItems, (lineItem) => lineItem.id === item.id);
    if (lineItemIndex === -1) {
      newLineItems.push(item);
    } else {
      item.quantity = ++newLineItems[lineItemIndex].quantity;
      _.set(newLineItems, [lineItemIndex], item);
    }

    await userCartRef.update({
      [CartSchema.TOTAL_ITEMS]: _.reduce(
        newLineItems.map((lineItem) => lineItem.quantity),
        (sum, item) => sum + item
      ),
      [CartSchema.TOTAL_UNIQUE_ITEMS]: _.uniqBy(newLineItems, (ele) => ele.id).length,
      [CartSchema.LINE_ITEMS]: newLineItems,
      [CartSchema.SUBTOTAL]: _.reduce(
        newLineItems.map((lineItem) => parseFloat(lineItem.price) * lineItem.quantity),
        (sum, item) => sum + item
      ),
    });
  }

  public static async updateCartItemQuantityById(id: string, quantity: number): Promise<void> {
    const currentUser = auth().currentUser;
    if (!currentUser) {
      Alert.alert('Error!', "User not authenticated. Couldn't create a cart.", [{ text: 'Okay' }], {
        cancelable: true,
      });
      return;
    }
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
    _.set(newLineItems, [lineItemIndexToBeUpdated], lineItemToBeUpdated);

    await userCartRef.update({
      [CartSchema.TOTAL_ITEMS]: _.reduce(
        newLineItems.map((lineItem) => lineItem.quantity),
        (sum, item) => sum + item
      ),
      [CartSchema.TOTAL_UNIQUE_ITEMS]: _.uniqBy(newLineItems, (ele) => ele.id).length,
      [CartSchema.LINE_ITEMS]: newLineItems,
      [CartSchema.SUBTOTAL]: _.reduce(
        newLineItems.map((lineItem) => parseFloat(lineItem.price) * lineItem.quantity),
        (sum, item) => sum + item
      ),
    });
  }

  // delete a cart item
  public static async deleteCartItemById(id: string): Promise<void> {
    const currentUser = auth().currentUser;
    if (!currentUser) {
      Alert.alert('Error!', "User not authenticated. Couldn't create a cart.", [{ text: 'Okay' }], {
        cancelable: true,
      });
      return;
    }
    const userCartRef = db().collection(FirestoreCollections.CARTS).doc(currentUser.uid);
    let userCart = new CartSchema(await userCartRef.get());
    if (!userCart.exists) throw new Error(`User cart not found`);

    const newLineItems: ProductLineItemDataPointer[] = userCart.line_items.filter(
      (lineItem) => lineItem.id === id
    );

    await userCartRef.update({
      [CartSchema.TOTAL_ITEMS]: _.reduce(
        newLineItems.map((lineItem) => lineItem.quantity),
        (sum, item) => sum + item
      ),
      [CartSchema.TOTAL_UNIQUE_ITEMS]: _.uniqBy(newLineItems, (ele) => ele.id).length,
      [CartSchema.LINE_ITEMS]: newLineItems,
      [CartSchema.SUBTOTAL]: _.reduce(
        newLineItems.map((lineItem) => parseFloat(lineItem.price) * lineItem.quantity),
        (sum, item) => sum + item
      ),
    });
  }
}
