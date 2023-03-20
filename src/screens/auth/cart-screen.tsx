import { ActivityIndicator, FlatList, ScrollView, Text, View } from 'react-native';
import ProtectedRoute from '../../components/auth/protected-route';
import ButtonBase from '../../components/common/buttons/button-base';
import ScreenContainer from '../../components/layout/screen-container';
import CartItem from '../../components/pages/cart/cart-item';
import useProtectedRouter from '../../hooks/router/use-protected-router';
import { useUserCart } from '../../hooks/user/use-user-cart';

const CartScreen = () => {
  const { cart, loading } = useUserCart();
  const protectedRouter = useProtectedRouter('Cart');
  return (
    <ProtectedRoute>
      <ScreenContainer>
        <View className='min-h-[90vh]'>
          <View className='flex-1 min-h-[60vh] max-h-[60vh] border-b border-b-black/10 pb-4'>
            {!loading && cart ? (
              <FlatList data={cart.line_items} renderItem={({ item }) => <CartItem {...item} />} />
            ) : (
              <View className='flex items-center justify-center'>
                <ActivityIndicator />
              </View>
            )}
          </View>
          <ScrollView className='py-4'>
            <View className='flex flex-row justify-between mb-2'>
              <Text className='font-medium font-main text-lg text-black/60'>Sub Total</Text>
              <Text className='font-semibold font-main text-lg text-black/90'>
                {cart?.subtotal ?? '0.00'}
                <Text className='text-black/40'>LKR</Text>
              </Text>
            </View>
            <View className='flex flex-row justify-between'>
              <Text className='font-medium font-main text-lg text-black/60'>Shipping</Text>
              <Text className='font-semibold font-main text-lg text-black/90'>
                0<Text className='text-black/40'>LKR</Text>
              </Text>
            </View>
            <View className='border-b border-b-black/10 pt-4 mb-4' />
            <View className='flex flex-row justify-between'>
              <Text className='font-semibold font-main text-2xl text-black/90'>Total</Text>
              <Text className='font-semibold font-main text-2xl text-black/90'>
                {cart?.subtotal ?? '0.00'}
                <Text className='text-black/40'>LKR</Text>
              </Text>
            </View>
            <ButtonBase onPress={() => protectedRouter.navigate('Checkout')} buttonClassName='mt-3'>
              <Text className='font-main font-semibold text-lg text-white text-center'>
                Checkout
              </Text>
            </ButtonBase>
          </ScrollView>
        </View>
      </ScreenContainer>
    </ProtectedRoute>
  );
};

export default CartScreen;
