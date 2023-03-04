import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import ButtonBase from '../../components/common/buttons/button-base';
import InputBase from '../../components/common/inputs/input-base';
import ScreenContainer from '../../components/layout/screen-container';

interface FormData {
  email: string;
  password: string;
}

const SignUpScreen = () => {
  const { control, handleSubmit, formState } = useForm();

  const onSubmit = handleSubmit((data) => {
    Alert.prompt('Form', JSON.stringify(data));
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
          <View className='w-full'>
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
            <ButtonBase onPress={onSubmit} disabled={!formState.isDirty}>
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
