import { ActivityIndicator, Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import useRouter from '../../../hooks/router/use-router';
import { useLoading } from '../../../hooks/use-loading';
import { ProductSchema } from '../../../schemas/product-schema';
import { CartUtils } from '../../../utils/cart-utils';
import { Colors } from '../../../utils/colors';
import ButtonBase from '../buttons/button-base';
import IconButton from '../buttons/icon-button';

type Props = {
  product: ProductSchema;
};

const ProductCard = (props: Props) => {
  const router = useRouter('All Products');
  const { isLoading, setIsLoading } = useLoading();

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await CartUtils.addToCart(props.product.toLineItemPointer());
      Alert.alert('Success', 'Product added to cart');
      setIsLoading(false);
    } catch (error) {
      console.log('🚀 ~ file: product-card.tsx:45 ~ handleAddToCart ~ error:', error);
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity
      className='relative w-56 h-80 mr-4 p-4 flex flex-col bg-black/5 rounded-2xl mb-6'
      onPress={() => router.push('Single Product', { ...props.product.toJson() })}
    >
      <View className='flex flex-row justify-between w-full'>
        <Text className='w-full max-w-[100px] text-black font-bold font-main text-lg capitalize break-all'>
          {props.product.name}
        </Text>
        <Text className='font-main font-medium text-xl'>{props.product.price}LKR</Text>
      </View>

      <View className='flex-grow flex items-center justify-center'>
        <Image className='h-40 w-40 p-3 rounded-lg' source={{ uri: props.product.image }} />
      </View>

      <View className='flex flex-row'>
        <ButtonBase
          onPress={handleAddToCart}
          variant={'custom'}
          buttonClassName='bg-white flex-1 items-center justify-center mr-3 shadow-md'
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.BLACK.concat('80')} />
          ) : (
            <Text className='font-semibold'>Add to cart</Text>
          )}
        </ButtonBase>

        <IconButton
          onPress={() => {}}
          variant={'custom'}
          size='custom'
          buttonClassName='flex justify-center bg-black/90 border border-primary-dark/50 shadow-md'
        >
          <Icon name='heart' size={22} color={Colors.WHITE}></Icon>
        </IconButton>
      </View>
    </TouchableOpacity>
  );
};
export default ProductCard;
