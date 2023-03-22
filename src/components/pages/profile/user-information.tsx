import { MutableRefObject, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { View } from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import useRouter from '../../../hooks/router/use-router';
import { useLoading } from '../../../hooks/use-loading';
import { Colors } from '../../../utils/colors';
import { UserUtils } from '../../../utils/user-utils';
import ProductInformationCard from './product-information-card';
import PurchasesInformationCard from './purchases-information-card';
import ReviewsInformationCard from './reviews-information-cad';

interface Props {
  expandHeight: () => void;
  isMyInformationCollapsed: boolean;
  userInformationRef: MutableRefObject<Animated.Value>;
}

const UserInformation = (props: Props) => {
  const router = useRouter('Profile');
  const { isLoading, setIsLoading } = useLoading();
  const fadeAnimation = useRef(new Animated.Value(0));

  useEffect(() => {
    if (!props.isMyInformationCollapsed) {
      Animated.timing(fadeAnimation.current, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start();
    } else {
      Animated.timing(fadeAnimation.current, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start();
    }
  }, [props.isMyInformationCollapsed]);

  const handleUserAccountDelete = async () => {
    try {
      setIsLoading(true);
      router.replace('Home');
      await UserUtils.deleteUserAccount().then(() =>
        Alert.alert(
          'Successfully Deleted!',
          'Your account has been deleted successfully',
          [{ text: 'Ok' }],
          { cancelable: true }
        )
      );
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log('🚀 ~ file: user-information.tsx:44 ~ handleUserAccountDelete ~ error:', error);
      Alert.alert(
        'Requires Recent Login!',
        error.message.split('] ')[1],
        [{ text: 'Ok', onPress: () => router.navigate('Login') }],
        { cancelable: true }
      );
    }
  };

  const handleSignOut = async () => {
    try {
      router.replace('Home');
      await UserUtils.signOut();
    } catch (error: any) {
      console.log('🚀 ~ file: user-information.tsx:79 ~ handleSignOut ~ error:', error);
      Alert.alert(
        'Sign out attempt failed!',
        error.message.split('] ')[1],
        [{ text: 'Ok', onPress: () => router.navigate('Login') }],
        { cancelable: true }
      );
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => props.expandHeight()}>
      <Animated.View
        style={{ height: props.userInformationRef.current }}
        className='bg-primary-light/30 -mx-6 rounded-t-[32px] px-6 py-6'
      >
        <Text className='font-main font-semibold text-xl text-black pb-6'>My Information</Text>

        <Animated.View style={{ opacity: fadeAnimation.current }} className='flex space-y-4'>
          <View className='w-auto flex flex-row' style={{ gap: 14 }}>
            <ProductInformationCard />
            <PurchasesInformationCard />
            <ReviewsInformationCard />
          </View>
          <TouchableOpacity
            onPress={handleSignOut}
            activeOpacity={0.7}
            className='flex flex-row items-center justify-between bg-primary-main/30 rounded-2xl p-4'
          >
            <>
              <Text className='font-main font-semibold text-primary-dark/90'>Sign Out</Text>
              <Icon name='log-out' color={Colors.TEAL_DARKER.concat('90')} size={18} />
            </>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleUserAccountDelete}
            activeOpacity={0.7}
            className='flex flex-row items-center justify-between bg-red/25 rounded-2xl p-4'
          >
            {isLoading ? (
              <ActivityIndicator color={Colors.RED.concat('90')} />
            ) : (
              <>
                <Text className='font-main font-semibold text-red/80'>Delete Account</Text>
                <Icon name='trash-2' color={Colors.RED.concat('90')} size={18} />
              </>
            )}
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default UserInformation;
