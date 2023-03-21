import { IProductDocument, ProductLineItemDataPointer } from '../schemas/product-schema';
import { FirebaseUtils } from './firebase-utils';

export class ProductsUtils extends FirebaseUtils {
  public static getProductLineItemDataPointerByJson(
    product: IProductDocument
  ): ProductLineItemDataPointer {
    return {
      id: product.id as string,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 0,
    };
  }
}
