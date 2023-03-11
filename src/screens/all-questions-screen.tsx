import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QuestionCard from '../components/common/forum/question-card';
import useRouter from '../hooks/use-router';
type Props = {};
const AllQuestionsScreen = (props: Props) => {
  const router = useRouter('All Questions');
  const backgroundStyle = 'bg-white dark:bg-slate-900 h-screen';

  return (
    <SafeAreaView className=' bg-white'>
      <View className='p-4 h-full relative'>
        <ScrollView className={backgroundStyle}>
          <View className='pb-4'></View>
          <QuestionCard />
          <QuestionCard />
        </ScrollView>
        <View className='absolute bottom-0 right-0 mx-3 my-3 z-20'>
          <Pressable
            className='bg-primary-main rounded-full flex items-center justify-center py-2 px-4'
            onPress={() => router.push('Add Question')}
          >
            <Text className='text-white font-main text-2xl font-extrabold'>+</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default AllQuestionsScreen;
