import dayjs from 'dayjs';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QuestionCard from '../components/common/forum/question-card';
import { useAllQuestions } from '../hooks/questions/use-all-questions';
import useRouter from '../hooks/router/use-router';

type Props = {};
const AllQuestionsScreen = (props: Props) => {
  const router = useRouter('All Questions');
  const { questions, loading, error } = useAllQuestions();
  const backgroundStyle = 'bg-white dark:bg-slate-900 h-screen';

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
                  <QuestionCard
                    id={question.id}
                    title={question.title}
                    description={question.question}
                    date={question.created}
                    votes={question.votes}
                    answers={question.answers}
                    author_firstname={question.author.first_name ? question.author.first_name : ''}
                    author_lastname={question.author.last_name ? question.author.last_name : ''}
                    author_id={question.author.id ? question.author.id : ''}
                  />
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
          <TouchableOpacity
            className='bg-primary-main p-4 rounded-full'
            onPress={() => router.navigate('Add Question')}
          >
            <Image className='h-6 w-6 p-3' source={require('../assets/images/plus.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default AllQuestionsScreen;
