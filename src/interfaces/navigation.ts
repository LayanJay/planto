import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigators/auth-stack-navigator';
import { RootStackParamList } from '../navigators/stack-navigator';

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>;
