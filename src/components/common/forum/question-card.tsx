import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import useRouter from '../../../hooks/router/use-router';

dayjs.extend(relativeTime);

type Props = {
  title: string;
  description: string;
  date: any;
  votes: any;
  id: string;
  author_firstname: string;
  author_lastname: string;
  author_id: string;
  answers: any;
};

const QuestionCard = ({
  title,
  description,
  date,
  votes,
  id,
  author_firstname,
  answers,
  author_id,
  author_lastname,
}: Props) => {
  const router = useRouter('All Questions');

  return (
    <TouchableOpacity
      className='mb-2 py-5 px-4 flex flex-row justify-around items-center bg-primary-main rounded-lg'
      onPress={() =>
        router.push('Single Question', {
          id: id,
          title: title,
          question: description,
          date: date,
          votes: votes,
          answers: answers,
          author_firstname: author_firstname,
          author_lastname: author_lastname,
          author_id: author_id,
        })
      }
    >
      <View className='pl-1 pr-6 flex items-center'>
        <View>
          <Image source={require('../../../assets/images/like.png')} className='h-4 w-4' />
        </View>

        <Text className='font-bold font-main text-xs pt-1'>{votes.length}</Text>
      </View>
      <Text className='font-bold font-main w-3/4 px-2'>{title}</Text>
      {date && (
        <Text className='font-bold font-main text-xs'>
          {dayjs(date.toDate()).fromNow(true)} ago
        </Text>
      )}
    </TouchableOpacity>
  );
};
export default QuestionCard;
