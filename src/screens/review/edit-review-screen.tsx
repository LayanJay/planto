import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ButtonBase from '../../components/common/buttons/button-base';
import InputBase from '../../components/common/inputs/input-base';
import Container from '../../components/layout/container';
import { useGetProduct } from '../../hooks/product/use-get-product';
import { useGetReview } from '../../hooks/review/use-get-review';
import useRouter from '../../hooks/router/use-router';
import { useLoading } from '../../hooks/use-loading';
import { useCurrentUser } from '../../hooks/user/use-current-user';
import { IReviewDocument, ReviewSchema } from '../../schemas/review-schema';

const updateReview = async (
  review: Partial<IReviewDocument>,
  ref: FirebaseFirestoreTypes.DocumentReference
) => {
  await ref.update(ReviewSchema.updateDocFromJson(review));
};

const EditReviewScreen = () => {
  const { control, handleSubmit, reset, setValue } = useForm();
  const router = useRouter('Edit Review');

  const { authUser, loading: userLoading } = useCurrentUser(false);

  const { review, loading: reviewLoading } = useGetReview(
    // @ts-expect-error
    router.params?.product_id,
    // @ts-expect-error
    router.params?.review_id
  );
  // @ts-expect-error
  const { product, loading } = useGetProduct(router.params?.product_id);
  const [rating, setRating] = useState<number>(0);
  const { isLoading, setIsLoading } = useLoading();

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const out: Partial<IReviewDocument> = {
        text: data.text,
        rating: rating,
      };
      await updateReview(out, review!.ref);
      setIsLoading(false);
      router.goBack();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (review) {
      setValue('text', review.text);
      if (rating === 0) setRating(review?.rating);
    }
  }, [review]);

  return (
    <Container>
      {userLoading || loading || reviewLoading || !rating ? (
        <Text className='font-main'>Loading..</Text>
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
                <View
                  key={i}
                  onTouchStart={() => {
                    setRating(i + 1);
                  }}
                >
                  <Icon
                    name={i + 1 <= rating ? 'star' : 'star-border'}
                    size={40}
                    color={i + 1 <= rating ? '#53AC9A' : 'gray'}
                  />
                </View>
              ))}
            </View>
            <Text className='font-main w-full mx-auto text-center text-md text-black'>
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

export default EditReviewScreen;
