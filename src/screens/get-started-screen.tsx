import { Image, Text, View } from 'react-native';
import ButtonBase from '../components/common/buttons/button-base';
import ScreenContainer from '../components/layout/screen-container';
import useRouter from '../hooks/use-router';

const GetStartedScreen = () => {
  const router = useRouter('Getting Started');

  return (
    <ScreenContainer>
      <View className='px-6 py-8'>
        <View className='flex items-center'>
          <View>
            <Text className='font-semibold font-main text-lg text-primary-dark mb-2'>
              Planto.Shop
            </Text>
            <Text className='font-semibold font-main text-4xl text-black/90'>Plant a tree</Text>
            <Text className='font-semibold font-main text-4xl text-black/90'>for life</Text>
          </View>
        </View>
        <View>
          <Image source={require('../assets/images/plant-1.png')} className='w-full h-80' />
        </View>
        <View className='mb-4'>
          <Text className='font-main font-medium text-lg text-center text-black/90'>
            Get started with Planto
          </Text>
        </View>
        <View className='flex flex-col w-full'>
          <ButtonBase buttonClassName='mb-3' onPress={() => router.navigate('Login')}>
            <Text className='text-white font-main font-semibold text-lg text-center uppercase'>
              Login
            </Text>
          </ButtonBase>
          <ButtonBase
            variant={'custom'}
            buttonClassName='flex flex-row items-center justify-center space-x-3 bg-transparent active:bg-black/5 border border-black/20'
            onPress={() => router.navigate('Sign Up')}
          >
            <Text className='text-black/80 font-main font-semibold text-lg text-center uppercase'>
              Sign Up
            </Text>
          </ButtonBase>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default GetStartedScreen;
