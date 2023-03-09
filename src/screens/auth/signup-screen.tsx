import { FirebaseAuthTypes } from '@react-native-firebase/auth';
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
import { auth, db } from '../../config/firebase-config';
import useRouter from '../../hooks/use-router';
import { UserRoles, UserSchema } from '../../schemas/user-schema';
import { FirestoreCollections } from '../../utils/firebase-utils';

interface FormData {
  email: string;
  password: string;
}

const createUserDocument = async (userCred: FirebaseAuthTypes.UserCredential) => {
  await db()
    .collection(FirestoreCollections.USERS)
    .doc(userCred.user.uid)
    .set(
      UserSchema.createDocFromJson({
        email: userCred.user.email,
        first_name: userCred.user.displayName?.split(' ')[0] ?? '',
        last_name: userCred.user.displayName?.split(' ')[1] ?? '',
        purchases: [],
        reviews: [],
        role: UserRoles.CUSTOMER,
        uid: userCred.user.uid,
      })
    );

  // TODO: remove later
  Alert.alert('Successful!', '', [{ text: 'Ok' }], { cancelable: true });
};

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
        await createUserDocument(userCred);
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

  const signInWithGoogleProvider = () => {};

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
            <ButtonBase onPress={onSubmit} disabled={!formState.isDirty} loading={loading}>
              <Text className='font-main font-semibold text-lg text-white text-center'>
                Continue
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
          <View className='flex flex-1 flex-row space-x-2 items-center mb-4'>
            <View className='h-1 border-b border-black/20 grow'></View>
            <Text className='font-main text-black/40'>or</Text>
            <View className='h-1 border-b border-black/20 grow'></View>
          </View>
          <View className='w-full'>
            <GoogleButton onPress={signInWithGoogleProvider} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

export default SignUpScreen;
