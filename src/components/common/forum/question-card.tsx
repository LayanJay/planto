import {useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity, View} from 'react-native';
import {RootStackScreenProps} from '../../../interfaces/navigation';

type Props = {};

const QuestionCard = (props: Props) => {
  const navigation = useNavigation<RootStackScreenProps<'All Questions'>['navigation']>();
  return (
    <TouchableOpacity
      className='mb-2 py-3 px-4 flex flex-row justify-around items-center bg-secondary-dark'
      onPress={() => navigation.push('Single Question', {id: 'sdfs'})}
    >
      <View className='pl-1 pr-6 flex items-center'>
        <Text className='font-bold font-main text-xs pt-1'>2</Text>
      </View>
      <Text className='font-bold font-main w-3/4 px-2'>Title</Text>
      <Text className='font-bold font-main text-xs'>2020/10/10</Text>
    </TouchableOpacity>
  );
};
export default QuestionCard;
