import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { CartUtils } from '../../../utils/cart-utils';
import { Colors } from '../../../utils/colors';
import ButtonBase, { ButtonSizes, ButtonVariants } from '../../common/buttons/button-base';

interface Props {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

const CartItem = (props: Props) => {
  const handleIncreaseQuantity = async () => {
    await CartUtils.updateCartItemQuantityById(props.id, 1);
  };

  const handleDecreaseQuantity = async () => {
    await CartUtils.updateCartItemQuantityById(props.id, -1);
  };

  const handleRemoveItem = async () => {
    await CartUtils.deleteCartItemById(props.id);
  };
  return (
    <View key={props.id} className='flex flex-row mb-3'>
      <View className='bg-black/5 rounded-2xl'>
        <Image className='h-36 w-32' source={{ uri: props.image }} />
      </View>
      <View className='flex-1 flex-col justify-between ml-4 py-4'>
        <View>
          <Text className='font-main font-semibold text-xl mb-1'>{props.name}</Text>
          <Text className='font-main font-medium text-black/60'>
            Price: {parseInt(props.price) * props.quantity}LKR
          </Text>
        </View>
        <View className='flex flex-row justify-between'>
          <View className='flex flex-row items-center space-x-2'>
            <TouchableOpacity
              onPress={handleDecreaseQuantity}
              activeOpacity={0.7}
              className='border border-black/40 px-1 rounded-md'
            >
              <Text className='font-main font-medium text-black/70'>-</Text>
            </TouchableOpacity>
            <Text>Quantity: {props.quantity}</Text>
            <TouchableOpacity
              onPress={handleIncreaseQuantity}
              activeOpacity={0.7}
              className='border border-black/40 px-1 rounded-md'
            >
              <Text className='font-main font-medium text-black/70'>+</Text>
            </TouchableOpacity>
          </View>
          <View>
            <ButtonBase
              onPress={handleRemoveItem}
              buttonClassName=''
              size={ButtonSizes.CUSTOM}
              variant={ButtonVariants.CUSTOM}
            >
              <Icon name='x' size={22} color={Colors.BLACK.concat('80')}></Icon>
            </ButtonBase>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
