import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Chip from '../../components/common/buttons/chip-button';
import IconButton from '../../components/common/buttons/icon-button';
import ProductCard from '../../components/common/producs/product-card';
import ScreenContainer from '../../components/layout/screen-container';
import { useProducts } from '../../hooks/product/use-products';
import useProtectedRouter from '../../hooks/router/use-protected-router';
import useRouter from '../../hooks/router/use-router';
import { useCurrentUser } from '../../hooks/user/use-current-user';
import { Colors } from '../../utils/colors';
import { CategoryType } from '../../schemas/product-schema';
import ButtonBase from '../../components/common/buttons/button-base';

const AllProducts = () => {
  const router = useRouter('All Products');
  const protectedRouter = useProtectedRouter('All Products');
  const { authUser } = useCurrentUser();
  const filterOptions = ['All', 'Outdoor', 'Indoor'];
  const [selectedFilter, setSelectedFilter] = useState<keyof typeof CategoryType | 'All'>('All');
  const { products, loading, error } = useProducts();

  return (
    <ScreenContainer>
      <View className='relative flex min-h-[90vh]'>
        <View className='flex flex-row justify-between items-center mt-8'>
          <View>
            <Text className='font-semibold font-main text-3xl text-black/90'>Find your</Text>
            <Text className='font-semibold font-main text-3xl text-black/90'>favorite plants</Text>
          </View>

          <View className='flex flex-row' style={{ gap: 5 }}>
            <IconButton
              onPress={() => (authUser ? protectedRouter.navigate('Cart') : null)}
              variant={'custom'}
              sizeOverride={'w-10 h-10'}
              buttonClassName='flex justify-center bg-white border-2 border-primary-dark/50'
            >
              <Icon name='shopping-cart' size={18} color={Colors.TEAL_DARKER.concat('90')}></Icon>
            </IconButton>

            <IconButton
              onPress={() => (authUser ? protectedRouter.navigate('All Questions') : null)}
              variant={'custom'}
              sizeOverride={'w-10 h-10'}
              buttonClassName='flex justify-center bg-white border-2 border-primary-dark/50'
            >
              <Icon name='message-square' size={18} color={Colors.TEAL_DARKER.concat('90')}></Icon>
            </IconButton>

            <IconButton
              onPress={() => (authUser ? protectedRouter.navigate('Profile') : null)}
              variant={'custom'}
              sizeOverride={'w-10 h-10'}
              buttonClassName='flex justify-center bg-white border-2 border-primary-dark/50'
            >
              <Icon name='user' size={18} color={Colors.TEAL_DARKER.concat('90')}></Icon>
            </IconButton>
          </View>
        </View>

        <View className='w-full rounded-2xl h-32 bg-secondary-light mt-4 flex flex-row items-center px-6'>
          <View className='flex flex-col mr-auto'>
            <Text className='font-bold font-main text-3xl text-black/90 '>30% OFF</Text>
            <Text className='font-c font-main text-lg text-black/50 '>On Sundays</Text>
          </View>

          <Image className='h-24 w-24 p-3' source={require('../../assets/images/plant-4.png')} />
        </View>

        <View className='flex flex-row mt-6' style={{ gap: 7 }}>
          {filterOptions.map((opt) => {
            return (
              <Chip
                key={opt}
                onPress={() => setSelectedFilter(opt as keyof typeof CategoryType)}
                selected={opt === selectedFilter}
              >
                {opt}
              </Chip>
            );
          })}
        </View>

        <View className='flex flex-wrap flex-row justify-between mt-6 mb-16' style={{ gap: 2 }}>
          {!loading && products ? (
            <FlatList
              horizontal
              data={products.filter((item) =>
                selectedFilter === 'All' ? true : item.category === CategoryType[selectedFilter]
              )}
              renderItem={({ item }) => <ProductCard product={item} />}
            />
          ) : (
            <ActivityIndicator />
          )}
        </View>

        <View className='absolute bottom-10 right-0 z-20'>
          <IconButton
            onPress={() => router.navigate('Add Product')}
            variant={'custom'}
            size='custom'
            buttonClassName='flex justify-center bg-primary-main shadow-md'
          >
            <Icon name='plus' size={24} color={Colors.WHITE}></Icon>
          </IconButton>
        </View>
      </View>
    </ScreenContainer>
  );
};
export default AllProducts;
