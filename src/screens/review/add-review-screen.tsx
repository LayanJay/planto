import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ButtonBase from '../../components/common/buttons/button-base';
import InputBase from '../../components/common/inputs/input-base';
import Container from '../../components/layout/container';
import { db } from '../../config/firebase-config';
import { useGetProduct } from '../../hooks/product/use-get-product';
import useRouter from '../../hooks/router/use-router';
import { useLoading } from '../../hooks/use-loading';
import { useCurrentUser } from '../../hooks/user/use-current-user';
import { IReviewDocument, ReviewSchema } from '../../schemas/review-schema';
import { FirestoreCollections } from '../../utils/firebase-utils';

const addReview = async (review: Omit<IReviewDocument, 'id' | 'created' | 'modified'>) => {
  const ref = db()
    .collection(FirestoreCollections.PRODUCTS)
    .doc(review.product.id as string)
    .collection(FirestoreCollections.REVIEWS);
  await ref.add(ReviewSchema.createDocFromJson(review));
};

const AddReviewScreen = () => {
  const { control, handleSubmit, reset } = useForm({});
  const router = useRouter('Add Review');
  // @ts-expect-error
  const [rating, setRating] = useState<number>(router.params?.rating);
  const { authUser, user, loading: userLoading } = useCurrentUser(true);
  // @ts-expect-error
  const { product, loading } = useGetProduct(router.params!.id);
  const { isLoading, setIsLoading } = useLoading();

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      // @ts-expect-error
      if (authUser && authUser.uid && router.params && router.params.id && !loading) {
        const review: Omit<IReviewDocument, 'id' | 'created' | 'modified'> = {
          text: data.text || null,
          product: {
            // @ts-expect-error
            id: router.params.id,
            name: product?.name as string,
            price: product?.price as string,
            seller: {
              id: product?.seller.id as string,
              first_name: product?.seller.first_name as string,
              last_name: product?.seller.last_name as string,
            },
          },
          author: {
            id: authUser.uid,
            first_name: user?.first_name as string,
            last_name: user?.last_name as string,
          },
          rating: rating,
        };

        await addReview(review);
        router.goBack();
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  });

  return (
    <Container>
      {userLoading || loading ? (
        <View className='w-full h-screen flex flex-row justify-center items-center'>
          <ActivityIndicator className='-mt-28' size={50} color='#58BCA8' />
        </View>
      ) : (
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false}>
          <View className=' mt-4 mb-8 flex flex-row items-center space-x-4 bg-secondary-light px-4 py-4 rounded-xl'>
            <Image
              className='h-24 w-24 rounded-xl'
              source={{
                uri: product?.image,
              }}
            />
            <View>
              <Text className='font-main text-black text-base font-bold capitalize'>
                {product?.name}
              </Text>
              <Text className='font-main text-black text-base mt-1 mr-24'>
                {product?.description?.length! > 100
                  ? `${product?.description.substring(0, 100)}...`
                  : product?.description}
              </Text>
            </View>
          </View>
          <View className='flex flex-row space-x-4'>
            <Avatar.Text
              size={50}
              label={
                user?.first_name && user.last_name
                  ? user?.first_name[0] + user?.last_name[0]
                  : (user?.email?.split('@')[0].substring(0, 2) as string)
              }
            />

            <View>
              <Text className='font-main text-black text-base font-bold'>
                {authUser?.displayName || authUser?.email?.split('.')[0]}
              </Text>
              <Text className='font-main text-black text-base mt-1 mr-16'>
                Share your thougths on the product with other customers.
              </Text>
            </View>
          </View>
          <View className='mb-8'>
            <View className='flex flex-row justify-between pt-6 pb-3 px-4'>
              {[...Array(5)].map((_, i) => (
                <View key={i} onTouchStart={() => setRating(i + 1)}>
                  <Icon
                    name={i + 1 <= rating ? 'star' : 'star-border'}
                    size={40}
                    color={i + 1 <= rating ? '#53AC9A' : 'gray'}
                  />
                </View>
              ))}
            </View>
            <Text className='w-full mx-auto text-center text-md text-black'>
              {rating} star rating
            </Text>
          </View>
          <View className='mb-4'>
            <Text className='font-main text-xl text-black dark:text-white '>
              Describe your experience (optional)
            </Text>
            <InputBase
              name='text'
              placeholder='Enter your review'
              control={control}
              inputWrapperClassNames='mb-6'
            />
          </View>

          <ButtonBase onPress={onSubmit} loading={isLoading}>
            <Text className='font-main font-semibold text-lg text-white text-center'>Submit</Text>
          </ButtonBase>
        </KeyboardAwareScrollView>
      )}
    </Container>
  );
};

export default AddReviewScreen;
