import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackScreenProps } from '../../interfaces/navigation';
import { RootStackParamList } from '../../navigators/stack-navigator';
import { useCurrentUser } from '../user/use-current-user';

const usePublicRouter = (currentRoute: keyof RootStackParamList) => {
  const { authUser, authUserLoading } = useCurrentUser();
  const navigation = useNavigation<RootStackScreenProps<typeof currentRoute>['navigation']>();
  const route = useRoute<RootStackScreenProps<typeof currentRoute>['route']>();

  return {
    ...navigation,
    replace: (routeName: keyof RootStackParamList) => {
      if (!authUserLoading) {
        if (authUser) {
          if (routeName === 'Login' || routeName === 'Sign Up') {
            navigation.replace('Home');
            return;
          }
          navigation.replace(routeName);
        } else {
          navigation.replace('Login');
        }
      }
    },
    push: (routeName: keyof RootStackParamList) => {
      if (!authUserLoading) {
        if (authUser) {
          if (routeName === 'Login' || routeName === 'Sign Up') {
            navigation.replace('Home');
            return;
          }
          navigation.push(routeName);
        } else {
          navigation.push('Login');
        }
      }
    },
    navigate: (routeName: keyof RootStackParamList) => {
      if (!authUserLoading) {
        if (authUser) {
          if (routeName === 'Login' || routeName === 'Sign Up') {
            navigation.replace('Home');
            return;
          }
          navigation.navigate(routeName);
        } else {
          navigation.navigate('Login');
        }
      }
    },
    ...route,
  };
};

export default usePublicRouter;
