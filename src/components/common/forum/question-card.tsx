import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useGetQuestion } from '../../../hooks/questions/use-get-question';
import useRouter from '../../../hooks/router/use-router';

dayjs.extend(relativeTime);

type Props = {
  id: string;
};

const QuestionCard = ({ id }: Props) => {
  const router = useRouter('All Questions');
  const { question, loading, error } = useGetQuestion(id);

  if (loading) {
    return (
      <View className='flex justify-center items-center min-h-screen'>
        <Text className='font-main font-bold text-xl text-primary-main'>
          Hold on. The question is loading...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className='flex justify-center items-center min-h-screen'>
        <Text className='font-main font-bold text-xl text-red'>
          {`Seems like there is an error: ${error}`}
        </Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      className='mb-2 py-5 px-4  bg-primary-light/0 border-2 border-primary-main rounded-lg flex'
      onPress={() =>
        router.push('Single Question', {
          id: id,
        })
      }
    >
      <View className='flex flex-row justify-start'>
        <View className='pr-6 flex items-center justify-center'>
          <View>
            <Image source={require('../../../assets/images/like.png')} className='h-4 w-4' />
          </View>

          <Text className='font-bold font-main text-xs pt-1'>{question?.votes?.length}</Text>
        </View>
        <Text className='font-bold font-main w-3/4 px-2'>{question?.title}</Text>
      </View>

      {question?.created && (
        <Text className='font-bold font-main text-xs self-end'>
          {dayjs(question.created.toDate()).fromNow(false)}
        </Text>
      )}
    </TouchableOpacity>
  );
};
export default QuestionCard;
