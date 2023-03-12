import { useSignInWithEmailAndPassword } from '@skillnation/react-native-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import ButtonBase from '../../components/common/buttons/button-base';
import GoogleButton from '../../components/common/buttons/google-button';
import InputBase from '../../components/common/inputs/input-base';
import ScreenContainer from '../../components/layout/screen-container';
import { auth } from '../../config/firebase-config';
import useRouter from '../../hooks/router/use-router';
import { FirebaseAuthUtils } from '../../utils/firebase-utils';

interface FormData {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const { control, handleSubmit, formState } = useForm<FormData>();
  const router = useRouter('Login');
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const onSubmit = handleSubmit(async (data) => {
    try {
      Keyboard.dismiss();
      await signInWithEmailAndPassword(data.email, data.password);

      if (!loading && error) throw error;
      if (!loading && user) {
        router.replace('Home');
      }
    } catch (error: any) {
      Keyboard.dismiss();
      Alert.alert(
        'Error!',
        error.message ?? 'Something went wrong! Try again later',
        [
          error && error.code === 'auth/user-not-found'
            ? { text: 'Sign up', onPress: () => router.replace('Sign Up') }
            : { text: 'Try Later' },
        ],
        { cancelable: true }
      );
    }
  });

  return (
    <ScreenContainer>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View className='flex items-center h-full'>
          <View className='my-6'>
            <Text className='font-main font-semibold text-2xl text-center text-primary-dark mb-1'>
              Planto.Shop
            </Text>
            <Text className='font-main font-medium text-center text-black/70'>
              Your favorite plants are awaiting for you
            </Text>
          </View>
          <View className='w-full mb-4'>
            <InputBase
              label='email'
              name='email'
              placeholder='Enter your email'
              control={control}
              inputWrapperClassNames='mb-6'
              rules={{
                required: '*Required',
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Email must be a valid email',
                },
              }}
            />
            <InputBase
              label='password'
              name='password'
              placeholder='Enter your password'
              control={control}
              secureTextEntry
              inputWrapperClassNames='mb-8'
              rules={{
                required: '*Required',
                minLength: {
                  value: 8,
                  message: 'The password should be 8 characters long',
                },
              }}
            />
            {/* TODO: create a submit button with loading state */}
            <ButtonBase onPress={onSubmit} disabled={!formState.isDirty} loading={loading}>
              <Text className='font-main font-semibold text-lg text-white text-center'>Login</Text>
            </ButtonBase>
            <View className='flex flex-row items-center justify-center space-x-1 mt-3'>
              <Text className='font-main text-black/40 text-center'>Don't have an Account?</Text>
              <Pressable
                onPress={() => {
                  router.replace('Sign Up');
                }}
              >
                <Text className='font-main text-primary-dark'>Sign up</Text>
              </Pressable>
            </View>
          </View>
          <View className='flex flex-1 flex-row space-x-2 items-center mb-4'>
            <View className='h-1 border-b border-black/20 grow'></View>
            <Text className='font-main text-black/40'>or</Text>
            <View className='h-1 border-b border-black/20 grow'></View>
          </View>
          <View className='w-full'>
            <GoogleButton
              onPress={async () => {
                await FirebaseAuthUtils.signInWithGoogleProvider().then(() => {
                  router.replace('Home');
                });
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

export default LoginScreen;
