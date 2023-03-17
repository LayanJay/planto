import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ButtonBase from '../../components/common/buttons/button-base';
import InputBase from '../../components/common/inputs/input-base';
import Container from '../../components/layout/container';
import { db } from '../../config/firebase-config';
import { useGetProduct } from '../../hooks/product/use-get-product';
import { useLoading } from '../../hooks/use-loading';
import useRouter from '../../hooks/use-router';
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
  const { control, handleSubmit } = useForm();
  const router = useRouter('Add Review');
  // @ts-ignore
  const [rating, setRating] = useState<number>(router.params?.rating);
  const { authUser, user, loading: userLoading } = useCurrentUser();
  const { product, loading } = useGetProduct(router.params!.id);
  const { isLoading, setIsLoading } = useLoading();

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      if (authUser && authUser.uid && router.params && router.params.id) {
        const review: Omit<IReviewDocument, 'id' | 'created' | 'modified'> = {
          text: data.text || null,
          product: {
            id: router.params.id,
            name: product?.name || '',
            price: product?.price || '',
          },
          author: {
            id: authUser.uid,
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
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
        <Text>Loading..</Text>
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
                {product?.description}
              </Text>
            </View>
          </View>
          <View className='flex flex-row space-x-4'>
            <Image
              className='h-16 w-16 rounded-full'
              source={{
                uri: authUser?.photoURL || '',
              }}
            />
            <View>
              <Text className='font-main text-black text-base font-bold'>
                {authUser?.displayName}
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
