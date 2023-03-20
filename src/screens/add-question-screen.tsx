import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Text, View } from 'react-native';
import ButtonBase from '../components/common/buttons/button-base';
import InputBase from '../components/common/inputs/input-base';
import useRouter from '../hooks/router/use-router';
import { QuestionUtils } from '../utils/question-utils';

type Props = {};
const AddQuestionScreen = (props: Props) => {
  const router = useRouter('Add Question');
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      Keyboard.dismiss();
      await QuestionUtils.createQuestion({ title: data.title, question: data.description });
      router.replace('All Questions');
    } catch (error: any) {
      Keyboard.dismiss();
      Alert.alert(
        'Error!',
        error.message ?? 'Something went wrong! Try again later',
        [
          error
            ? { text: 'Go back', onPress: () => router.replace('All Questions') }
            : { text: 'Try Later' },
        ],
        { cancelable: true }
      );
    }
  });

  return (
    <View className='pt-4 px-4 h-full'>
      <Text className='font-main font-medium text-center text-black/70 text-2xl pb-3'>
        Ask A Question
      </Text>
      <Text className='text-black/70 pb-2 font-main font-medium text-center'>
        What do you have in mind?
      </Text>
      <View className='pt-2 h-full flex flex-col'>
        <InputBase
          label='Question title'
          name='title'
          placeholder='Add a title for your question'
          control={control}
          inputWrapperClassNames='mb-6'
          rules={{
            required: '*Required',
          }}
        />
        <InputBase
          label='Description'
          name='description'
          placeholder='Add a description for your question'
          control={control}
          inputWrapperClassNames='mb-6'
          rules={{
            required: '*Required',
          }}
        />
        <ButtonBase>
          <Text
            className='font-main font-semibold text-lg text-white text-center'
            onPress={onSubmit}
          >
            Post Question
          </Text>
        </ButtonBase>
      </View>
    </View>
  );
};
export default AddQuestionScreen;
