import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import useRouter from '../../../hooks/router/use-router';
import { IProductDocument } from '../../../schemas/product-schema';
import { Colors } from '../../../utils/colors';
import ButtonBase from '../buttons/button-base';
import IconButton from '../buttons/icon-button';

type Props = IProductDocument;

const QuestionCard = (props: Props) => {
  const router = useRouter('Single Product');

  return (
    <TouchableOpacity
      className='relative w-56 h-80 mr-4 p-4 flex flex-col bg-black/5 rounded-2xl mb-6'
      onPress={() => router.push('Single Product', { ...props })}
    >
      <Text className='absolute -left-4 top-1/2 transform -rotate-90 text-black/80 font-semibold font-main text-base'>
        {props.name}
      </Text>
      <View className='flex flex-row justify-end w-full'>
        <Text className='font-main font-semibold text-xl'>$39</Text>
      </View>

      <View className='flex-grow flex items-center justify-center'>
        <Image className='h-40 w-40 p-3' source={require('../../../assets/images/plant-2.png')} />
      </View>

      <View className='flex flex-row'>
        <ButtonBase
          variant={'custom'}
          buttonClassName='bg-white flex-1 items-center justify-center mr-3 shadow-md'
        >
          <Text className='font-semibold'>Add to cart</Text>
        </ButtonBase>

        <IconButton
          onPress={() => {}}
          variant={'custom'}
          size='custom'
          buttonClassName='flex justify-center bg-black/90 border border-primary-dark/50 shadow-md'
        >
          <Icon name='heart' size={22} color={Colors.WHITE}></Icon>
        </IconButton>
      </View>
    </TouchableOpacity>
  );
};
export default QuestionCard;
