import {useNavigation} from '@react-navigation/native';
import {Image, Text, View} from 'react-native';
import ButtonBase from '../components/common/buttons/button-base';
import ScreenContainer from '../components/layout/screen-container';
import {RootStackScreenProps} from '../interfaces/navigation';

const GetStartedScreen = () => {
  const navigation = useNavigation<RootStackScreenProps<'Getting Started'>['navigation']>();
  // direct user here only if the user is a new user or haven't logged in yet
  return (
    <ScreenContainer>
      <View className='p-8'>
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
          <Image source={require('../assets/images/plant-1.png')} className='w-full h-96' />
        </View>
        <View className='mb-8'>
          <Text className='font-main font-medium text-lg text-center text-black/90'>
            Worldwide delivery
          </Text>
          <Text className='font-main font-medium text-lg text-center text-black/90'>
            within 10-15 days
          </Text>
        </View>
        <View className='flex items-center'>
          <ButtonBase onPress={() => navigation.replace('Home')}>
            <Text className='text-white font-main font-semibold text-lg text-center uppercase'>
              Get Started
            </Text>
          </ButtonBase>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default GetStartedScreen;
