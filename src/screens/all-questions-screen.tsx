import {useNavigation} from '@react-navigation/native';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ButtonBase from '../components/common/buttons/button-base';
import QuestionCard from '../components/common/forum/question-card';
import {RootStackScreenProps} from '../interfaces/navigation';
type Props = {};
const AllQuestionsScreen = (props: Props) => {
  const navigation = useNavigation<RootStackScreenProps<'All Questions'>['navigation']>();
  const backgroundStyle = 'bg-white dark:bg-slate-900 h-screen';

  return (
    <SafeAreaView className=' bg-white'>
      <View className='p-4 h-full relative'>
        <ScrollView className={backgroundStyle}>
          <View className='pb-4'>
            <ButtonBase
              onPress={() => navigation.replace('Home')}
              buttonClassName='mt-3'
              variant={'primary'}
            >
              <Text>Hello</Text>
            </ButtonBase>
          </View>
          <QuestionCard />
          <QuestionCard />
        </ScrollView>
        <View className='absolute bottom-0 right-0 mx-3 my-3 z-20'>
          <Pressable
            className='bg-primary-main rounded-full flex items-center justify-center'
            onPress={() => navigation.push('Add Question')}
          >
            <Text className='text-white font-main text-3xl p-4 font-extrabold'>+</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default AllQuestionsScreen;
