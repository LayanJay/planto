import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Pressable, Text, View} from 'react-native';
import Input from '../components/common/input';
import {RootStackScreenProps} from '../interfaces/navigation';

type Props = {};
const AddQuestionScreen = (props: Props) => {
  const navigation = useNavigation<RootStackScreenProps<'Add Question'>['navigation']>();
  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      reply: '',
    },
  });
  return (
    <View className='pt-4 px-4 h-full'>
      <Text className='font-main text-2xl font-semibold pb-3'>Ask A Question</Text>
      <Text className='text-black pb-2 font-main'>What do you have in mind?</Text>
      <View className='pt-2 h-full flex flex-col'>
        <Input
          style={'border p-2 rounded-sm mb-2'}
          labelStyle={'pb-1'}
          control={control as any}
          errors={errors}
          name='title'
          label='Question Title'
          placeholder='Add a title for your question'
          registerOptions={{
            required: {
              value: true,
              message: '*Required',
            },
          }}
        />
        <Input
          style={'border p-2 rounded-sm mb-2'}
          inputStyle={'h-28'}
          labelStyle={'pb-1'}
          multiline
          control={control as any}
          errors={errors}
          name='description'
          label='Question'
          placeholder='Add a description for your question'
          registerOptions={{
            required: {
              value: true,
              message: '*Required',
            },
          }}
        />
        <Pressable className='bg-primary-main text-white flex flex-row items-center justify-center py-2 mt-4'>
          <Text className='text-white text-lg font-main'>Post Question</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default AddQuestionScreen;
