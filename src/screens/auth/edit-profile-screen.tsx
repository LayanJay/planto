import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import ProtectedRoute from '../../components/auth/protected-route';
import ButtonBase from '../../components/common/buttons/button-base';
import InputBase from '../../components/common/inputs/input-base';
import ScreenContainer from '../../components/layout/screen-container';
import useProtectedRouter from '../../hooks/router/use-protected-router';
import { UserUtils } from '../../utils/user-utils';
interface FormData {
  email: string;
  first_name: string;
  last_name: string;
  address: string;
}

const EditProfileScreen = () => {
  const protectedRouter = useProtectedRouter('EditProfile');
  const { control, handleSubmit, formState } = useForm<FormData>({
    defaultValues: {
      // @ts-ignore
      email: protectedRouter.params?.email as string,
      // @ts-ignore
      first_name: protectedRouter.params?.first_name as string,
      // @ts-ignore
      last_name: protectedRouter.params?.last_name as string,
      // @ts-ignore
      address: protectedRouter.params?.address as string,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await UserUtils.updateUserAccount({
        first_name: data.first_name,
        last_name: data.last_name,
        address: data.address,
      });
      protectedRouter.goBack();
    } catch (error) {
      console.log('🚀 ~ file: edit-profile-screen.tsx:28 ~ onSubmit ~ error:', error);
    }
  });
  return (
    <ProtectedRoute>
      <ScreenContainer>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View className='my-6'>
            <Text className='font-main font-semibold text-2xl text-center text-primary-dark mb-1'>
              Profile Information
            </Text>
            <Text className='font-main font-medium text-center text-black/70'>
              Update your profile
            </Text>
          </View>

          <View className='w-full mb-4'>
            <InputBase
              label='first name'
              name='first_name'
              placeholder='Enter your first name'
              control={control}
              inputWrapperClassNames='mb-6'
              rules={{
                required: '*Required',
              }}
            />
            <InputBase
              label='last name'
              name='last_name'
              placeholder='Enter your last name'
              control={control}
              inputWrapperClassNames='mb-6'
              rules={{
                required: '*Required',
              }}
            />
            <InputBase
              label='address'
              name='address'
              placeholder='Enter your address'
              control={control}
              inputWrapperClassNames='mb-6'
              rules={{
                required: '*Required',
              }}
            />
            <InputBase
              label='email'
              name='email'
              placeholder='Enter your email'
              control={control}
              inputWrapperClassNames='mb-8'
              disabled
              rules={{
                required: '*Required',
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Email must be a valid email',
                },
              }}
            />

            <ButtonBase
              onPress={formState.isDirty ? onSubmit : () => protectedRouter.replace('Profile')}
              disabled={!formState.isDirty}
              loading={formState.isSubmitting}
            >
              <Text className='font-main font-semibold text-lg text-white text-center'>
                {formState.isDirty ? 'Update' : 'Save'}
              </Text>
            </ButtonBase>
          </View>
        </KeyboardAvoidingView>
      </ScreenContainer>
    </ProtectedRoute>
  );
};

export default EditProfileScreen;
