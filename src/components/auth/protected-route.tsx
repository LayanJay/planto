import type { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import useRouter from '../../hooks/router/use-router';
import { useCurrentUser } from '../../hooks/user/use-current-user';
import { UserRoles } from '../../schemas/user-schema';
import ButtonBase from '../common/buttons/button-base';
import ScreenContainer from '../layout/screen-container';

interface Props extends PropsWithChildren {
  role?: UserRoles;
}

const ProtectedRoute = (props: Props) => {
  const router = useRouter('Getting Started');
  const { authUser, user, loading, error } = useCurrentUser(true);

  if (!loading && error) {
    return (
      <ScreenContainer>
        <View className='h-full'>
          <Text>Something went wrong! Try again later</Text>
          <ButtonBase onPress={() => router.navigate('Login')}>
            <Text>Go Back</Text>
          </ButtonBase>
        </View>
      </ScreenContainer>
    );
  }

  if (!loading && authUser && user) {
    if (!!props.role && user.role !== props.role) {
      return (
        <ScreenContainer>
          <View className='h-full'>
            <Text>You are not authorized to access this content</Text>
            <ButtonBase onPress={() => router.navigate('Login')}>
              <Text>Go Back</Text>
            </ButtonBase>
          </View>
        </ScreenContainer>
      );
    }

    return <>{props.children}</>;
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
