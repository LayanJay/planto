import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ButtonBase from '../components/common/buttons/button-base';
import InputBase from '../components/common/inputs/input-base';
import useRouter from '../hooks/use-router';
import { useCurrentUser } from '../hooks/user/use-current-user';

const AddReviewScreen = () => {
  const { control, handleSubmit, formState } = useForm<FormData>();
  const router = useRouter('Add Review');

  const [rating, setRating] = useState(router.params?.rating);
  const { authUser, loading: userLoading } = useCurrentUser();

  const onSubmit = handleSubmit(async (data) => {});

  return (
    <View className='px-6'>
      {userLoading ? (
        <Text>Loading..</Text>
      ) : (
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false}>
          <View className=' mt-6 mb-8 flex flex-row space-x-4 bg-secondary-light px-4 py-4 rounded-2xl'>
            <Image className='h-24 w-24' source={require('../assets/images/plant-5.png')} />
            <View>
              <Text className='font-main text-black text-base font-bold'>Generic Pot Plant</Text>
              <Text className='font-main text-black text-base mt-1 mr-24'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod, omnis.
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
              name='review'
              placeholder='Enter your review'
              control={control}
              inputWrapperClassNames='mb-6'
              rules={{
                required: '*Required',
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Email must be a valid email',
                },
              }}
            />
          </View>

          <ButtonBase onPress={onSubmit}>
            <Text className='font-main font-semibold text-lg text-white text-center'>Submit</Text>
          </ButtonBase>
        </KeyboardAwareScrollView>
      )}
    </View>
  );
};

export default AddReviewScreen;
