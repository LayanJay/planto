import _ from 'lodash';
import { ProductLineItemDataPointer } from '../schemas/product-schema';
import { ReviewDataPointer } from '../schemas/review-schema';
import { UserDataPointer, UserSchema } from '../schemas/user-schema';

export class UserHelper {
  public static getUserDataPointer(user: UserSchema): UserDataPointer {
    return user.toPointer();
  }

  public static getSamplePurchases(): ProductLineItemDataPointer[] {
    return [
      {
        id: '1',
        name: 'Product 1',
        price: '1000',
        quantity: 1,
        image: '../assets/images/plant-2.png',
      },
      {
        id: '2',
        name: 'Product 2',
        price: '1500',
        quantity: 1,
        image: '../assets/images/plant-3.png',
      },
      {
        id: '3',
        name: 'Product 3',
        price: '1200',
        quantity: 1,
        image: '../assets/images/plant-4.png',
      },
    ];
  }
  public static getSampleReviews(user: UserSchema): ReviewDataPointer[] {
    return [
      {
        id: '1',
        title: 'Review 1',
        rating: _.clamp(4.5, 0, 5),
        product: {
          id: '1',
          price: '1500',
          name: 'Product 1',
          seller: this.getUserDataPointer(user),
        },
      },
      {
        id: '2',
        title: 'Review 2',
        rating: _.clamp(4, 0, 5),
        product: {
          id: '2',
          price: '1200',
          name: 'Product 2',
          seller: this.getUserDataPointer(user),
        },
      },
      {
        id: '3',
        title: 'Review 3',
        rating: _.clamp(4.2, 0, 5),
        product: {
          id: '3',
          price: '1000',
          name: 'Product 3',
          seller: this.getUserDataPointer(user),
        },
      },
    ];
  }
}
