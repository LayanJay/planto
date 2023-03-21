import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-animatable';
import { ReviewSchema } from '../../schemas/review-schema';
import ReviewCard from './review-card';

type Props = {
  review: ReviewSchema;
};

const YourReviewCard = ({ review }: Props) => {
  return (
    <View>
      <Text className=' text-2xl font-bold text-black/90 dark:text-white font-main '>
        Your Review
      </Text>
      <View className='py-2'>
        <ReviewCard review={review} options={true} />
      </View>
    </View>
  );
};

export default YourReviewCard;
