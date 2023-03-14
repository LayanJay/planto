import { FlatList, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Chip from '../components/common/buttons/chip-button';
import ProductCard from '../components/common/producs/product-card';
import useRouter from '../hooks/use-router';

type Props = {};

const AllProducts = (props: Props) => {
  const router = useRouter('All Products');
  const backgroundStyle = 'bg-white dark:bg-slate-900 h-screen';

  const filterOptions = ['All', 'Outdoor', 'Indoor'];

  const data = [
    {
      id: 'kjhiuhi',
      title: 'test',
      image: 'sdjhkjh',
    },
    {
      id: 'sdkjhfkjsd',
      title: 'stdfgdf',
      image: 'sdjhkjh',
    },
    {
      id: 'sdkjhfkjssd',
      title: 'iiouwekjhksdjfh skjdfh',
      image: 'sdjhkjh',
    },
  ];

  return (
    <SafeAreaView className=' bg-white'>
      <View className='p-4 h-full relative'>
        <Text className='font-semibold font-main text-3xl text-black/90'>Find your</Text>
        <Text className='font-semibold font-main text-3xl text-black/90'>favorite plants</Text>

        <View className='w-full rounded-2xl h-32 bg-secondary-light mt-4 flex flex-row items-center px-6 '>
          <View className='flex flex-col mr-auto'>
            <Text className='font-bold font-main text-3xl text-black/90 '>30% OFF</Text>
            <Text className='font-c font-main text-lg text-black/50 '>On Sundays</Text>
          </View>

          <Image className='h-24 w-24 p-3' source={require('../assets/images/plant-4.png')} />
        </View>

        {/* ⚠️ Tailwind "gap" property DOES NOT work properly here */}
        <View className='flex flex-row mt-4' style={{ gap: 7 }}>
          {filterOptions.map((opt) => {
            return (
              <Chip key={opt} selected>
                <Text>{opt}</Text>
              </Chip>
            );
          })}
        </View>

        <View className='flex flex-wrap flex-row justify-between mt-6' style={{ gap: 2 }}>
          <FlatList
            horizontal
            data={data}
            renderItem={({ item }) => <ProductCard title={item.title} />}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View className='absolute bottom-0 right-0 mx-3 my-3 z-20'>
          {/* FIXME: */}
          <TouchableOpacity
            className='bg-primary-main p-4 rounded-full'
            // onPress={() => router.navigate('Add Product')}
          >
            <Image className='h-6 w-6 p-3' source={require('../assets/images/plus.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default AllProducts;
