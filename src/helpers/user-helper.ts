import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import _ from 'lodash';
import { ProductPurchasedDataPointer } from '../schemas/product-schema';
import { ReviewDataPointer } from '../schemas/review-schema';

export class UserHelper {
  public static getSamplePurchases(): ProductPurchasedDataPointer[] {
    const productPurchasedDate = FirebaseFirestoreTypes?.Timestamp.fromDate(new Date());
    return [
      {
        id: '1',
        name: 'Product 1',
        price: '1000',
        purchased_date: productPurchasedDate,
      },
      {
        id: '2',
        name: 'Product 2',
        price: '1500',
        purchased_date: productPurchasedDate,
      },
      {
        id: '3',
        name: 'Product 3',
        price: '1200',
        purchased_date: productPurchasedDate,
      },
    ];
  }
  public static getSampleReviews(): ReviewDataPointer[] {
    return [
      {
        id: '1',
        title: 'Review 1',
        rating: _.clamp(4.5, 0, 5),
        product: {
          id: '1',
          price: '1500',
          name: 'Product 1',
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
        },
      },
    ];
  }
}
