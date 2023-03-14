import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import ButtonBase from '../buttons/button-base';

type Props = {
  title: string;
};

const QuestionCard = (props: Props) => {
  return (
    <TouchableOpacity className='w-56 h-72 mr-4 p-4 flex flex-col bg-black/5 rounded-md mb-6'>
      <View className=' flex flex-row justify-between'>
        <Text className='text-black/90 font-bold font-main text-xl'>{props.title}</Text>
        <Text className='font-main text-lg'>$39</Text>
      </View>

      <View className='flex-grow flex items-center justify-center'>
        <Image className='h-32 w-32 p-3' source={require('../../../assets/images/plant-2.png')} />
      </View>

      <View className='flex flex-row space-x-3'>
        <ButtonBase
          size={'small'}
          variant={'custom'}
          buttonClassName='bg-white flex items-center justify-center flex-grow'
        >
          <Text>Add to cart</Text>
        </ButtonBase>

        <TouchableOpacity className='bg-black h-10 w-10 rounded-full flex-shrink-0'></TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
export default QuestionCard;
