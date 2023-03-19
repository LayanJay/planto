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
      <Text className=' text-2xl text-black dark:text-white font-main '>Your Review</Text>
      <View className='py-4'>
        <ReviewCard review={review} options={true} />
      </View>
    </View>
  );
};

export default YourReviewCard;
