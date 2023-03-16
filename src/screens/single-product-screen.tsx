import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, Modal, ScrollView, Text, View } from 'react-native';
import ButtonBase from '../components/common/buttons/button-base';
import AnswerCard from '../components/common/forum/answer-card';
import Input from '../components/common/input';
import useRouter from '../hooks/router/use-router';

import { RootStackScreenProps } from '../interfaces/navigation';
import { CategoryType } from '../schemas/product-schema';

type Props = {};
const SingleQuestionScreen = (props: Props) => {
  const router = useRouter('Single Product');
  const route = useRoute<RootStackScreenProps<'Single Product'>['route']>();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      reply: '',
    },
  });

  return (
    <View className='h-full relative p-4 flex'>
      <View className='w-full flex justify-center items-center'>
        <Image
          className='w-80 h-80 object-cover p-3'
          source={require('../assets/images/plant-2.png')}
        />
      </View>

      <View className='flex flex-row justify-between items-center'>
        <Text className='font-main text-2xl font-bold text-black/90'>{route.params.name}</Text>
        <Text className='font-main text-lg text-primary-main'>{route.params.category}</Text>
      </View>

      <Text className='mt-4 text-base'>{route.params.description}</Text>

      <View className='fex flex-row w-full mt-6'>
        <View className='w-1/2'>
          <Text>Seller</Text>
          <Text className='text-xl text-black/90 font-bold'>Distiding</Text>
          <Text className='text-xl text-black/90 leading-none font-bold'>Plant store</Text>
        </View>

        <View className='w-1/2'>
          <Text>Availability</Text>
          <Text className='text-xl text-black/90 font-bold'>11 Left</Text>
        </View>
      </View>

      {/* Bottom bar */}
      <View className=' px-8 pb-5 absolute bottom-0 left-0 right-0 flex flex-row justify-between'>
        <View>
          <Text>Price</Text>
          <Text className='text-2xl text-black/90 font-bold'>${route.params.price}</Text>
        </View>

        <ButtonBase size={'medium'}>
          <Text className='font-main font-semibold text-lg text-white text-center'>
            Add to cart
          </Text>
        </ButtonBase>
      </View>
    </View>
  );
};
export default SingleQuestionScreen;
