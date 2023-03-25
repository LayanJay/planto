import dayjs from 'dayjs';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconButton from '../components/common/buttons/icon-button';
import QuestionCard from '../components/common/forum/question-card';
import { useAllQuestions } from '../hooks/questions/use-all-questions';
import useRouter from '../hooks/router/use-router';
import { Colors } from '../utils/colors';

type Props = {};
const AllQuestionsScreen = (props: Props) => {
  const router = useRouter('All Questions');
  const { questions, loading, error } = useAllQuestions();
  const backgroundStyle = 'bg-white dark:bg-slate-900 h-screen';

  if (loading) {
    return (
      <View className='flex justify-center items-center min-h-screen'>
        <Text className='font-main font-bold text-xl text-primary-main'>
          Hold on. The forum is loading...
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
    <SafeAreaView className=' bg-white'>
      <View className='p-4 h-full relative'>
        <ScrollView className={backgroundStyle}>
          <View className='pb-4'></View>
          {questions && questions.length > 0 ? (
            questions
              .sort((a, b) =>
                a.created &&
                b.created &&
                dayjs(a.created.toDate()).isBefore(b.created && dayjs(b.created.toDate()))
                  ? 1
                  : -1
              )
              .map((question) => (
                <View key={question.id}>
                  <QuestionCard id={question.id} />
                </View>
              ))
          ) : (
            <View className='flex justify-center items-center min-h-screen'>
              <Text className='font-main font-bold text-xl text-primary-main'>
                No questions asked yet. Let&apos;s ask one.
              </Text>
            </View>
          )}
        </ScrollView>
        <View className='absolute bottom-0 right-0 mx-3 my-3 z-20'>
          <IconButton
            onPress={() => router.navigate('Add Question')}
            variant={'custom'}
            size='custom'
            buttonClassName='flex justify-center bg-primary-main shadow-md'
          >
            <Icon name='plus' size={24} color={Colors.WHITE}></Icon>
          </IconButton>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default AllQuestionsScreen;
