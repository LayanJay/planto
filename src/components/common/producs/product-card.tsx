import { Image, Text, TouchableOpacity, View } from 'react-native';
import useRouter from '../../../hooks/router/use-router';
import { IProductDocument } from '../../../schemas/product-schema';

import ButtonBase from '../buttons/button-base';

type Props = IProductDocument;

const QuestionCard = (props: Props) => {
  const router = useRouter('Single Product');

  return (
    <TouchableOpacity
      className='w-56 h-80 mr-4 p-4 flex flex-col bg-black/5 rounded-md mb-6'
      onPress={() => router.push('Single Product', { ...props })}
    >
      <View className=' flex flex-row justify-between'>
        <Text className='text-black/90 font-bold font-main text-xl'>{props.name}</Text>
        <Text className='font-main text-lg'>$39</Text>
      </View>

      <View className='flex-grow flex items-center justify-center'>
        <Image className='h-40 w-40 p-3' source={require('../../../assets/images/plant-2.png')} />
      </View>

      <View className='flex flex-row space-x-3'>
        <ButtonBase
          size={'small'}
          variant={'custom'}
          buttonClassName='bg-white flex items-center justify-center flex-grow'
        >
          <Text className='font-bold'>Add to cart</Text>
        </ButtonBase>

        <TouchableOpacity className='bg-black h-10 w-10 rounded-full flex-shrink-0'></TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
export default QuestionCard;
