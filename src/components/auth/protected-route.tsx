import { useNavigation } from '@react-navigation/native';
import type { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import { useCurrentUser } from '../../hooks/user/use-current-user';
import { AuthStackScreenProps } from '../../interfaces/navigation';
import { UserRoles } from '../../schemas/user-schema';
import ButtonBase from '../common/buttons/button-base';
import ScreenContainer from '../layout/screen-container';

interface Props extends PropsWithChildren {
  role?: UserRoles;
}

const ProtectedRoute = (props: Props) => {
  const navigation = useNavigation<AuthStackScreenProps<'Login'>['navigation']>();
  const { authUser, user, loading, error } = useCurrentUser(true);

  if (!loading && error) {
    return (
      <ScreenContainer>
        <View className='h-full'>
          <Text>Something went wrong! Try again later</Text>
          <ButtonBase onPress={() => navigation.navigate('Login')}>
            <Text>Go Back</Text>
          </ButtonBase>
        </View>
      </ScreenContainer>
    );
  }

  if (!loading && authUser && user) {
    if (user.role !== props.role) {
      return (
        <ScreenContainer>
          <View className='h-full'>
            <Text>You are not authorized to access this content</Text>
            <ButtonBase onPress={() => navigation.navigate('Login')}>
              <Text>Go Back</Text>
            </ButtonBase>
          </View>
        </ScreenContainer>
      );
    }

    return <>{props.children}</>;
  }

  if (!authUser) {
    navigation.navigate('Login');
    return;
  }

  return (
    <ScreenContainer>
      <View className='flex items-center justify-center h-full'>
        <Text>Loading...</Text>
      </View>
    </ScreenContainer>
  );
};

export default ProtectedRoute;
