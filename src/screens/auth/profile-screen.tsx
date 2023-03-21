import { useRef, useState } from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ProtectedRoute from '../../components/auth/protected-route';
import IconButton from '../../components/common/buttons/icon-button';
import ScreenContainer from '../../components/layout/screen-container';
import UserInformation from '../../components/pages/profile/user-information';
import UserPurchases from '../../components/pages/profile/user-purchases';
import useProtectedRouter from '../../hooks/router/use-protected-router';
import { useCurrentUser } from '../../hooks/user/use-current-user';
import { Colors } from '../../utils/colors';

const ProfileScreen = () => {
  const { authUser, user } = useCurrentUser(true);
  const protectedRouter = useProtectedRouter('Profile');
  const [isMyInformationCollapsed, setIsMyInformationCollapsed] = useState(false);
  let userInformationRef = useRef(new Animated.Value(100));

  const shrinkHeight = () => {
    Animated.spring(userInformationRef.current, {
      toValue: 100,
      tension: 30,
      // duration: 200,
      useNativeDriver: false,
      // easing: Easing.cubic,
    }).start();

    setIsMyInformationCollapsed(true);
  };

  const expandHeight = () => {
    Animated.spring(userInformationRef.current, {
      toValue: 300,
      tension: 30,
      // duration: 200,
      useNativeDriver: false,
      // easing: Easing.cubic,
    }).start();

    setIsMyInformationCollapsed(false);
  };

  return (
    <ProtectedRoute>
      <ScreenContainer>
        <View className='relative flex h-[90vh]'>
          <View className='flex flex-row justify-between items-center mb-3'>
            <TouchableOpacity
              onPress={isMyInformationCollapsed ? () => expandHeight() : () => shrinkHeight()}
              activeOpacity={0.7}
              className='flex justify-center items-center w-14 h-14 rounded-full border border-primary-dark/50'
            >
              <Image
                source={
                  authUser && authUser.photoURL
                    ? { uri: authUser.photoURL }
                    : require('../../assets/images/avatar.png')
                }
                className='w-14 h-14 rounded-full'
              />
            </TouchableOpacity>
            <IconButton
              onPress={() =>
                user
                  ? protectedRouter.navigate('EditProfile', {
                      email: user.email,
                      first_name: user.first_name,
                      last_name: user.last_name,
                      address: user.address,
                    })
                  : null
              }
              variant={'custom'}
              buttonClassName='flex justify-center bg-white border border-primary-dark/50'
            >
              <Icon name='edit-3' size={24} color={Colors.TEAL_DARKER.concat('90')}></Icon>
            </IconButton>
          </View>
          <View className='flex justify-center items-center mb-3'>
            <View className='flex justify-center items-center w-32 h-32 rounded-full border border-separate border-spacing-3 border-primary-dark/50'>
              <Image
                source={
                  authUser && authUser.photoURL
                    ? { uri: authUser.photoURL }
                    : require('../../assets/images/avatar.png')
                }
                className='w-28 h-28 rounded-full'
              />
            </View>
          </View>
          <View className='flex items-center mb-10'>
            <Text className='font-semibold font-main text-2xl text-black/90 capitalize mb-1'>
              {user ? `${user.first_name} ${user.last_name}` : authUser?.email?.split('@')[0]}
            </Text>
            <Text className='font-main text-xs text-black/75'>
              {authUser ? authUser.email : ''}
            </Text>
          </View>
          <UserInformation
            expandHeight={expandHeight}
            userInformationRef={userInformationRef}
            isMyInformationCollapsed={isMyInformationCollapsed}
          />
          <UserPurchases shrinkHeight={shrinkHeight} />
        </View>
      </ScreenContainer>
    </ProtectedRoute>
  );
};

export default ProfileScreen;
