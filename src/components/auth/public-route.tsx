import { useNavigation } from '@react-navigation/native';
import type { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import { useCurrentUser } from '../../hooks/user/use-current-user';
import { RootStackScreenProps } from '../../interfaces/navigation';
import { UserRoles } from '../../schemas/user-schema';

interface Props extends PropsWithChildren {}

const PublicRoute = (props: Props) => {
  const navigation = useNavigation<RootStackScreenProps<'Getting Started'>['navigation']>();
  const { authUser, user, loading } = useCurrentUser(true);

  if (loading) {
    return (
      <View className='flex items-center justify-center h-full'>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!loading && authUser && user) {
    if (user.role === UserRoles.ADMIN) {
      // TODO: redirect back to the admin screen
      //   navigation.replace('')
    }

    // redirect normal users to the home
    navigation.replace('Home');
  }

  return <>{props.children}</>;
};

export default PublicRoute;
