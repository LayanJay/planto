import React from 'react';
import { Text, View } from 'react-native';
import { useListReviews } from '../../hooks/review/use-list-reviews';
import useRouter from '../../hooks/use-router';
const ReviewsScreen = () => {
  const router = useRouter('Reviews');
  const { reviews, loading, error } = useListReviews(router.params!.id);
  console.log(reviews);

  return (
    <View className='mt-4 px-6'>
      <View>
        <Text>Reviews</Text>
      </View>
    </View>
  );
};

export default ReviewsScreen;
