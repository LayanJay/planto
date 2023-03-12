import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ProtectedRoute from '../../components/auth/protected-route';
import IconButton from '../../components/common/buttons/icon-button';
import ScreenContainer from '../../components/layout/screen-container';
import { useCurrentUser } from '../../hooks/user/use-current-user';
import { Colors } from '../../utils/colors';

const ProfileScreen = () => {
  const { authUser } = useCurrentUser();
  return (
    <ProtectedRoute>
      <ScreenContainer>
        <View className='relative flex h-[90vh]'>
          <View className='flex flex-row justify-between items-center mb-3'>
            {/* profile photo collapsed + edit button */}
            <TouchableOpacity
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
              variant={'custom'}
              buttonClassName='flex justify-center bg-white border border-primary-dark/50'
            >
              <Icon name='edit-3' size={24} color={Colors.TEAL_DARKER.concat('90')}></Icon>
            </IconButton>
          </View>
          <View className='flex justify-center items-center mb-3'>
            {/* profile photo not collapsed */}
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
            {/* profile name, email not collapsed (hide when collapsed) */}
            <Text className='font-semibold font-main text-2xl text-black/90 capitalize mb-1'>
              {authUser && authUser.displayName
                ? authUser.displayName
                : authUser?.email?.split('@')[0]}
            </Text>
            <Text className='font-main text-xs text-black/75'>
              {authUser ? authUser.email : ''}
            </Text>
          </View>
          <View className='flex-1 bg-primary-dark -mx-6 rounded-t-[32px] px-6 py-6'>
            {/* collapsable menu and accordian */}
            <Text className='font-main font-semibold text-xl text-white'>My Information</Text>
          </View>
        </View>
      </ScreenContainer>
    </ProtectedRoute>
  );
};

export default ProfileScreen;
