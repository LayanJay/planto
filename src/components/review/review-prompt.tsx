import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useRouter from '../../hooks/router/use-router';

type Props = {
  product_id: string;
};

const ReviewPrompt = ({ product_id }: Props) => {
  const [rating, setRating] = useState(0);
  const router = useRouter('Add Review');
  return (
    <View className='mb-8'>
      <Text className=' text-2xl text-black dark:text-white font-main'>Rate this product</Text>
      <Text className='mt-2 text-md text-black dark:text-white font-main'>
        Tell us what you think about this product
      </Text>
      <View className='flex flex-row w-full justify-between py-6'>
        {[...Array(5)].map((e, i) => (
          <View
            key={i}
            onTouchStart={() => setRating(i + 1)}
            onTouchEnd={() => {
              router.push('Add Review', {
                id: product_id,
                rating: rating,
              });
              setRating(0);
            }}
          >
            <Icon
              name={i + 1 <= rating ? 'star' : 'star-border'}
              size={40}
              color={i + 1 <= rating ? '#53AC9A' : 'gray'}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default ReviewPrompt;
