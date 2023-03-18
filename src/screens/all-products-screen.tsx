import { FlatList, Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Chip from '../components/common/buttons/chip-button';
import IconButton from '../components/common/buttons/icon-button';
import ProductCard from '../components/common/producs/product-card';
import ScreenContainer from '../components/layout/screen-container';
import useRouter from '../hooks/router/use-router';
import { CategoryType, IProductDocument } from '../schemas/product-schema';
import { Colors } from '../utils/colors';

type Props = {};

const AllProducts = (props: Props) => {
  const router = useRouter('All Products');
  const filterOptions = ['All', 'Outdoor', 'Indoor'];

  // TODO: Remove ts ignore
  const data: IProductDocument[] = [
    // @ts-ignore
    {
      id: 'ID_KJKHKJSDHFKJKS',
      name: 'Bo gaha',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam`,
      price: '33.00',
      category: CategoryType.Indoor,
      image: 'https://',
      inventory: 23,
      seller: {
        first_name: 'lskdjf',
        last_name: 'skdjhfsjd',
        id: 'lksksdj',
      },
    },
    // @ts-ignore
    {
      id: 'ID_KsdfsdfDHFKJKS',
      name: 'Kos gaha',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam`,
      price: '33.99',
      category: CategoryType.Indoor,
      image: 'https://',
      inventory: 23,
      seller: {
        first_name: 'lskdjf',
        last_name: 'skdjhfsjd',
        id: 'lksksdj',
      },
    },
  ];

  return (
    <ScreenContainer>
      <View className='relative flex min-h-[90vh]'>
        <View className='mt-8'>
          <Text className='font-semibold font-main text-3xl text-black/90'>Find your</Text>
          <Text className='font-semibold font-main text-3xl text-black/90'>favorite plants</Text>
        </View>

        <View className='w-full rounded-2xl h-32 bg-secondary-light mt-4 flex flex-row items-center px-6'>
          <View className='flex flex-col mr-auto'>
            <Text className='font-bold font-main text-3xl text-black/90 '>30% OFF</Text>
            <Text className='font-c font-main text-lg text-black/50 '>On Sundays</Text>
          </View>

          <Image className='h-24 w-24 p-3' source={require('../assets/images/plant-4.png')} />
        </View>

        <View className='flex flex-row mt-6' style={{ gap: 7 }}>
          {filterOptions.map((opt) => {
            return (
              <Chip key={opt} selected>
                <Text className='font-main'>{opt}</Text>
              </Chip>
            );
          })}
        </View>

        <View className='flex flex-wrap flex-row justify-between mt-6' style={{ gap: 2 }}>
          <FlatList horizontal data={data} renderItem={({ item }) => <ProductCard {...item} />} />
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
