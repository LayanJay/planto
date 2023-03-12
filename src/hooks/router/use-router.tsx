import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackScreenProps } from '../interfaces/navigation';
import { RootStackParamList } from '../navigators/stack-navigator';

const useRouter = (currentRoute: keyof RootStackParamList) => {
  const navigation = useNavigation<RootStackScreenProps<typeof currentRoute>['navigation']>();
  const route = useRoute<RootStackScreenProps<typeof currentRoute>['route']>();

  return {
    ...navigation,
    ...route,
  };
};

export default useRouter;
