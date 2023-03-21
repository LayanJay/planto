import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { Text, View } from 'react-native';

dayjs.extend(relativeTime);

type Props = {
  data: any;
};

const AnswerCard = ({ data }: Props) => {
  return (
    <View className='pt-2 pb-3 border-b border-black/20'>
      <Text className='text-black/70'>{data.text}</Text>
      <View className='flex flex-row pt-2'>
        <Text className='text-black/70 text-xs'>
          {dayjs(data.created_at.toDate()).format('DD-MM-YYYY')}
        </Text>

        {data.answered_by && (
          <Text className='text-primary-main font-semibold text-xs'>
            {' '}
            by {data.answered_by.first_name + ' ' + data.answered_by.last_name}
          </Text>
        )}
      </View>
    </View>
  );
};

export default AnswerCard;
