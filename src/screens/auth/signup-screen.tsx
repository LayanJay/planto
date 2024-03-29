import { useCreateUserWithEmailAndPassword } from '@skillnation/react-native-firebase-hooks/auth';
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
import { UserUtils } from '../../utils/user-utils';

interface FormData {
  email: string;
  password: string;
}

const SignUpScreen = () => {
  const { control, handleSubmit, formState } = useForm<FormData>();
  const router = useRouter('Sign Up');
  const [createUserWithEmailAndPassword, userCred, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const onSubmit = handleSubmit(async (data) => {
    try {
      Keyboard.dismiss();
      await createUserWithEmailAndPassword(data.email, data.password);

      if (!loading && error) throw error;
      if (!loading && userCred) {
        await UserUtils.createUserDocument(userCred);
        router.replace('Home');
      }
    } catch (error: any) {
      Keyboard.dismiss();
      Alert.alert(
        'Error!',
        error.message ?? 'Something went wrong! Try again later',
        [
          error && error.code === 'auth/email-already-in-use'
            ? { text: 'Login', onPress: () => router.replace('Login') }
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
              Join with us today. Plant a tree for life
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
            <ButtonBase
              onPress={onSubmit}
              disabled={!formState.isDirty}
              loading={formState.isSubmitting}
            >
              <Text className='font-main font-semibold text-lg text-white text-center'>
                Sign Up
              </Text>
            </ButtonBase>
            <View className='flex flex-row items-center justify-center space-x-1 mt-3'>
              <Text className='font-main text-black/40 text-center'>Already have an Account?</Text>
              <Pressable
                onPress={() => {
                  router.replace('Login');
                }}
              >
                <Text className='font-main text-primary-dark'>Login</Text>
              </Pressable>
            </View>
          </View>
          <View className='flex flex-row space-x-2 items-center mb-4'>
            <View className='h-1 border-b border-black/20 grow'></View>
            <Text className='font-main text-black/40'>or</Text>
            <View className='h-1 border-b border-black/20 grow'></View>
          </View>
          <View className='w-full'>
            <GoogleButton
              onPress={async () => {
                await UserUtils.signInWithGoogleProvider().then(() => {
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

export default SignUpScreen;
