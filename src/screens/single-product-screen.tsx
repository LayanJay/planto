import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, Text, View } from 'react-native';
import ButtonBase from '../components/common/buttons/button-base';
import useRouter from '../hooks/router/use-router';
import Icon from 'react-native-vector-icons/Feather';

import { RootStackScreenProps } from '../interfaces/navigation';
import { Colors } from '../utils/colors';
import DeleteProductModal from '../components/common/producs/delete-modal';

type Props = {};
const SingleProductScreen = (props: Props) => {
  const router = useRouter('Single Product');
  const route = useRoute<RootStackScreenProps<'Single Product'>['route']>();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  return (
    <>
      {deleteModalOpen && (
        <DeleteProductModal onCancel={() => setDeleteModalOpen(false)} onDelete={() => {}} />
      )}

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

        <View className='fex flex-row w-full mt-6' style={{ gap: 6 }}>
          <ButtonBase
            variant={'custom'}
            buttonClassName='w-fit bg-black flex flex-row items-center justify-center space-x-2'
            size='small'
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
    </>
  );
};
export default SingleProductScreen;
