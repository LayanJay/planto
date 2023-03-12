import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackScreenProps } from '../../interfaces/navigation';
import { RootStackParamList } from '../../navigators/stack-navigator';
import { useCurrentUser } from '../user/use-current-user';

const useProtectedRouter = (currentRoute: keyof RootStackParamList) => {
  const { authUser, authUserLoading } = useCurrentUser();
  const navigation = useNavigation<RootStackScreenProps<typeof currentRoute>['navigation']>();
  const route = useRoute<RootStackScreenProps<typeof currentRoute>['route']>();

  return {
    ...navigation,
    replace: (routeName: keyof RootStackParamList) => {
      if (!authUserLoading) {
        if (authUser) {
          navigation.replace(routeName);
        } else {
          navigation.replace('Login');
        }
      }
    },
    push: (routeName: keyof RootStackParamList) => {
      if (!authUserLoading) {
        if (authUser) {
          navigation.push(routeName);
        } else {
          navigation.push('Login');
        }
      }
    },
    navigate: (routeName: keyof RootStackParamList) => {
      if (!authUserLoading) {
        if (authUser) {
          navigation.navigate(routeName);
        } else {
          navigation.navigate('Login');
        }
      }
    },
    ...route,
  };
};

export default useProtectedRouter;
