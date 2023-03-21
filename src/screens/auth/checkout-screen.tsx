import _ from 'lodash';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ProtectedRoute from '../../components/auth/protected-route';
import ButtonBase from '../../components/common/buttons/button-base';
import ScreenContainer from '../../components/layout/screen-container';
import useProtectedRouter from '../../hooks/router/use-protected-router';
import { useLoading } from '../../hooks/use-loading';
import { useCurrentUser } from '../../hooks/user/use-current-user';
import { useUserCart } from '../../hooks/user/use-user-cart';
import { CheckoutUtils } from '../../utils/checkout-utils';
import { Colors } from '../../utils/colors';

const enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
}

const CheckoutScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CASH_ON_DELIVERY);
  const protectedRouter = useProtectedRouter('Checkout');
  const { user } = useCurrentUser(true);
  const { cart } = useUserCart();
  const { isLoading, setIsLoading } = useLoading();

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    try {
      const result = await CheckoutUtils.createCheckoutSession();
      setIsLoading(false);
      switch (result) {
        case 'success':
          Alert.alert('Success', 'Your order has been placed successfully', [
            { text: 'OK', onPress: () => protectedRouter.navigate('Home') },
          ]);
          break;
        case 'failed':
          Alert.alert('Failed', 'Your order has been failed', [
            { text: 'Try Again Later', onPress: () => protectedRouter.navigate('Cart') },
          ]);
          break;
        case 'empty_cart':
          Alert.alert('Empty Cart', 'Your cart is empty', [
            { text: 'OK', onPress: () => protectedRouter.navigate('Home') },
          ]);
          break;
        default:
          Alert.alert('Error', 'Something went wrong', []);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('🚀 ~ file: checkout-screen.tsx:32 ~ handlePlaceOrder ~ error:', error);
    }
  };
  return (
    <ProtectedRoute>
      <ScreenContainer>
        <View className='flex flex-col min-h-[80vh] max-h-screen mt-4'>
          <View className='flex-1 flex-col'>
            {/* Delivery Address */}
            <Text className='font-main font-semibold text-2xl text-black/90 mb-4'>
              Delivery Address
            </Text>
            {user && user.address ? (
              <View className='flex flex-row items-center space-x-3 mb-6'>
                <View className='bg-primary-light/20 p-4 rounded-2xl'>
                  <Icon name='map-pin' size={24} color={Colors.TEAL_DARKER}></Icon>
                </View>
                <View>
                  <Text className='font-main font-semibold capitalize'>
                    {_.truncate(user.address, { length: 40 })}
                  </Text>
                  <Text className='font-main font-medium text-black/50 capitalize'>
                    {_(user.address)
                      .words(/[^, ]+/g)
                      .last()}
                  </Text>
                </View>
              </View>
            ) : null}
            {/* Payment method */}
            <Text className='font-main font-semibold text-2xl text-black/90 mb-4'>
              Payment Method
            </Text>
            <View className='flex mb-6'>
              <TouchableOpacity
                onPress={() => setPaymentMethod(PaymentMethod.CREDIT_CARD)}
                activeOpacity={0.5}
                className='flex flex-row items-center space-x-3 mb-4'
              >
                <View className='bg-primary-light/20 p-4 rounded-2xl'>
                  <Icon name='credit-card' size={24} color={Colors.TEAL_DARKER}></Icon>
                </View>
                <View className='flex-1 flex-row items-center justify-between'>
                  <View>
                    <Text className='font-main font-semibold mb-1'>Credit/Debit Card</Text>
                    <Text className='font-main font-medium text-xs text-black/50'>
                      ************ 1234
                    </Text>
                  </View>
                  <View className='border-2 border-primary-dark/80 rounded-full'>
                    {paymentMethod === PaymentMethod.CREDIT_CARD ? (
                      <View className='bg-primary-dark/80 p-1.5 m-0.5 rounded-full' />
                    ) : (
                      <View className='bg-white p-1.5 m-0.5 rounded-full' />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPaymentMethod(PaymentMethod.CASH_ON_DELIVERY)}
                activeOpacity={0.5}
                className='flex flex-row items-center space-x-3'
              >
                <View className='bg-primary-light/20 p-4 rounded-2xl'>
                  <Icon name='truck' size={24} color={Colors.TEAL_DARKER}></Icon>
                </View>
                <View className='flex-1 flex-row items-center justify-between'>
                  <View>
                    <Text className='font-main font-semibold mb-1'>Cash on delivery</Text>
                    <Text className='font-main font-medium text-xs text-black/50'>
                      Pay when your order is delivered
                    </Text>
                  </View>
                  <View className='border-2 border-primary-dark/80 rounded-full'>
                    {paymentMethod === PaymentMethod.CASH_ON_DELIVERY ? (
                      <View className='bg-primary-dark/80 p-1.5 m-0.5 rounded-full' />
                    ) : (
                      <View className='bg-white p-1.5 m-0.5 rounded-full' />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            {/* My Cart */}
            <Text className='font-main font-semibold text-2xl text-black/90 mb-4'>My Cart</Text>
            <View className='flex flex-row justify-between mb-2'>
              <Text className='font-medium font-main text-lg text-black/60'>Sub Total</Text>
              <Text className='font-semibold font-main text-lg text-black/90'>
                {cart?.subtotal ?? '0.00'}
                <Text className='text-primary-dark/70'> LKR</Text>
              </Text>
            </View>
            <View className='flex flex-row justify-between'>
              <Text className='font-medium font-main text-lg text-black/60'>Shipping</Text>
              <Text className='font-semibold font-main text-lg text-black/90'>
                {'0.00'}
                <Text className='text-primary-dark/70'> LKR</Text>
              </Text>
            </View>
            <View className='border-b border-b-black/10 pt-4 mb-4' />
            <View className='flex flex-row justify-between'>
              <Text className='font-semibold font-main text-2xl text-black/90'>Total</Text>
              <Text className='font-semibold font-main text-2xl text-black/90'>
                {cart?.subtotal ?? '0.00'}
                <Text className='text-primary-dark/70'> LKR</Text>
              </Text>
            </View>
          </View>
          <ButtonBase onPress={handlePlaceOrder} buttonClassName='mt-3' loading={isLoading}>
            <Text className='font-main font-semibold text-lg text-white text-center'>
              Place Order
            </Text>
          </ButtonBase>
        </View>
      </ScreenContainer>
    </ProtectedRoute>
  );
};

export default CheckoutScreen;
