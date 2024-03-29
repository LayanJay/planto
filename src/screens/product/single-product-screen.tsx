import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import ButtonBase from '../../components/common/buttons/button-base';
import useRouter from '../../hooks/router/use-router';

import { ScrollView, TouchableOpacity } from 'react-native';
import DeleteProductModal from '../../components/common/producs/delete-modal';
import ReviewSection from '../../components/review/review-section';
import { db } from '../../config/firebase-config';
import { useListReviews } from '../../hooks/review/use-list-reviews';
import { useLoading } from '../../hooks/use-loading';
import { useCurrentUser } from '../../hooks/user/use-current-user';
import { RootStackScreenProps } from '../../interfaces/navigation';
import { CartUtils } from '../../utils/cart-utils';
import { Colors } from '../../utils/colors';
import { FirestoreCollections } from '../../utils/firebase-utils';
import { ProductsUtils } from '../../utils/product-utils';

type Props = {};

const SingleProductScreen = (props: Props) => {
  const router = useRouter('Single Product');
  const route = useRoute<RootStackScreenProps<'Single Product'>['route']>();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { reviews, loading, count, averageRating } = useListReviews(route.params.id!);
  const { user } = useCurrentUser(true);
  const { isLoading, setIsLoading } = useLoading();

  const deleteProduct = async () => {
    await db().collection(FirestoreCollections.PRODUCTS).doc(route.params.id!).delete();
    router.goBack();
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await CartUtils.addToCart(ProductsUtils.getProductLineItemDataPointerByJson(route.params));
      Alert.alert('Success', 'Product added to cart');
      setIsLoading(false);
    } catch (error) {
      console.log('🚀 ~ file: product-card.tsx:45 ~ handleAddToCart ~ error:', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {deleteModalOpen && (
        <DeleteProductModal onCancel={() => setDeleteModalOpen(false)} onDelete={deleteProduct} />
      )}

      <View className='h-full relative flex'>
        <ScrollView className='px-4'>
          <View className='w-full flex justify-center items-center my-4'>
            <Image
              className='w-80 h-80 object-cover p-3 rounded-2xl'
              source={{ uri: route.params.image }}
            />
          </View>

          <View className='flex flex-row justify-between items-center'>
            <Text className='font-main text-2xl font-bold text-black/90'>{route.params.name}</Text>
            <Text className='font-main text-lg text-primary-main'>{route.params.category}</Text>
          </View>

          <Text className='mt-4 text-base'>{route.params.description}</Text>

          <View className='fex flex-row w-full mt-6'>
            <View className='w-1/3'>
              <Text>Seller</Text>
              <Text className='text-xl text-black/90 font-bold'>
                {route.params.seller.first_name}
              </Text>
              <Text className='text-xl text-black/90 leading-none font-bold'>
                {route.params.seller.last_name}
              </Text>
            </View>

            <View className='w-1/3'>
              <Text>Availability </Text>
              <Text className='text-xl text-black/90 font-bold'>{route.params.inventory} Left</Text>
            </View>

            <View className='w-1/3'>
              <Text>Rating</Text>
              <TouchableOpacity
                onPress={() => router.push('Reviews', { id: route.params.id! })}
                className='flex flex-row items-center'
                style={{ gap: 5 }}
              >
                <MatIcon name='star' size={20} color={Colors.BLACK} />
                <Text className='text-xl text-black/90 font-bold'>{averageRating?.toFixed(2)}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className='mt-8'>
            <ReviewSection product_id={route.params.id!} />
          </View>

          {user && user.id === route.params.seller.id && (
            <View className='fex flex-row w-full mt-6' style={{ gap: 6 }}>
              <ButtonBase
                variant={'custom'}
                buttonClassName='w-fit bg-black flex flex-row items-center justify-center space-x-2'
                size='small'
                onPress={() => router.push('Edit Product', { ...route.params })}
              >
                <Icon name='edit-3' size={14} color={Colors.WHITE}></Icon>
                <Text className='text-white'>Edit</Text>
              </ButtonBase>

              <ButtonBase
                onPress={() => setDeleteModalOpen(true)}
                variant={'custom'}
                buttonClassName='w-fit bg-red/50 flex flex-row items-center justify-center space-x-2'
                size='small'
              >
                <Icon name='trash' size={14} color={Colors.WHITE}></Icon>
                <Text className='text-white'>Delete</Text>
              </ButtonBase>
            </View>
          )}

          <View className='w-full h-24'></View>
        </ScrollView>

        {/* Bottom bar */}
        <View className=' px-8 py-3 absolute bottom-0 left-0 right-0 flex flex-row justify-between bg-white z-20 shadow-md'>
          <View>
            <Text>Price</Text>
            <Text className='text-2xl text-black/90 font-bold'>LKR {route.params.price}</Text>
          </View>

          <ButtonBase onPress={handleAddToCart} loading={loading} size={'medium'}>
            <Text className='font-main font-semibold text-lg text-white text-center'>
              Add to cart
            </Text>
          </ButtonBase>
        </View>
      </View>
    </>
  );
};
export default SingleProductScreen;
