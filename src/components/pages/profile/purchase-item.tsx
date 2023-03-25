import _ from 'lodash';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { CartSchema } from '../../../schemas/cart-schema';
import { Colors } from '../../../utils/colors';

interface Props {
  purchase: CartSchema;
}

const PurchaseItem = (props: Props) => {
  return (
    <View key={props.purchase.id} className='flex flex-row items-center space-x-3 mb-3'>
      <View className='bg-primary-light/20 p-6 rounded-2xl'>
        <Icon name='shopping-bag' size={28} color={Colors.TEAL_DARKER}></Icon>
      </View>
      <View>
        <View>
          <Text className='font-main font-semibold text-xl'>
            {_(props.purchase.line_items)
              .map((item) => item.name)
              .splice(0, 3)
              .value()
              .join(' & ')}{' '}
            ...
          </Text>
          <Text className='font-main font-medium text-black/60 mb-1'>
            Sub total: {props.purchase.subtotal} LKR
          </Text>
          <Text className='font-main text-xs text-black/60'>
            items: {props.purchase.total_items}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PurchaseItem;
