import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, {useState} from 'react';
import {Text, View} from 'react-native';

dayjs.extend(relativeTime);

type Props = {
  data: any;
};

const AnswerCard = ({data}: Props) => {
  const [createdUser, setCreatedUser] = useState<any>();

  return (
    <View className='pt-2 pb-3 border-b border-grey-light'>
      <Text className='text-grey-darker'>Answer</Text>
      <View className='flex flex-row pt-2'>
        <Text className='text-grey-main text-xs'>2020/10/10</Text>

        {createdUser && (
          <Text className='text-grey-dark font-semibold text-xs'> by Yuji Fushikuro</Text>
        )}
      </View>
    </View>
  );
};

export default AnswerCard;
