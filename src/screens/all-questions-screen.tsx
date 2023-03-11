import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
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
