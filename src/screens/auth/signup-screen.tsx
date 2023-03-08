import { UserCredential } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import ButtonBase from '../../components/common/buttons/button-base';
import InputBase from '../../components/common/inputs/input-base';
import ScreenContainer from '../../components/layout/screen-container';
import { auth, db } from '../../config/firebase-config';
import { userConverter, UserRoles, UserSchema } from '../../schemas/user-schema';
import { FirestoreCollections } from '../../utils/firebase-utils';

interface FormData {
  email: string;
  password: string;
}

const SignUpScreen = () => {
  const { control, handleSubmit, formState } = useForm<FormData>();
  const [createUserWithEmailAndPassword, _, loading] = useCreateUserWithEmailAndPassword(auth);

  const createUserDocument = async (userCred: UserCredential) => {
    const userRef = doc(db, FirestoreCollections.USERS, userCred.user.uid).withConverter(
      userConverter
    );
    await setDoc(
      userRef,
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
    Alert.alert('Successful!', '', [{ text: 'Ok' }], { cancelable: true });
  };

  const onSubmit = handleSubmit((data) => {
    createUserWithEmailAndPassword(data.email, data.password)
      .then(async (userCred) => {
        Keyboard.dismiss();
        if (!userCred || !userCred.user) {
          return;
        }
        await createUserDocument(userCred);
      })
      .catch((error) => {
        console.log(error);

        Keyboard.dismiss();
        Alert.alert('Error!', error.message, [{ text: 'Try Later' }], { cancelable: true });
      });
  });

  return (
    <ScreenContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className='flex items-center h-full'>
          <View className='mb-4'>
            <Text className='font-main font-semibold text-2xl text-center text-primary-dark mb-1'>
              Planto.Shop
            </Text>
            <Text className='font-main font-medium text-center text-black/70'>
              Plant a tree for life
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
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScreenContainer>
  );
};

export default SignUpScreen;
