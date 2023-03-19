import React from 'react';
import { FlatList, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ReviewCard from '../../components/review/review-card';
import { useListReviews } from '../../hooks/review/use-list-reviews';
import useRouter from '../../hooks/router/use-router';
const ReviewsScreen = () => {
  const router = useRouter('Reviews');
  // @ts-expect-error
  const { reviews, loading, count, averageRating } = useListReviews(router.params!.id);

  return (
    <>
      {loading ? (
        <Text className='font-main'>Loading...</Text>
      ) : (
        <>
          {reviews && reviews.length > 0 ? (
            <FlatList
              className='bg-white py-8 px-6'
              data={reviews}
              ListHeaderComponent={
                <View className='flex flex-col items-center pb-8'>
                  <Text className='font-main text-5xl text-black font-main text-center font-semibold'>
                    {averageRating?.toFixed(2)}
                  </Text>
                  <View className='flex flex-row mt-2'>
                    {[...Array(5)].map((_, i) => (
                      <View key={i}>
                        <Icon
                          name={
                            i + 1 <= Math.ceil(averageRating as number) ? 'star' : 'star-border'
                          }
                          size={20}
                          color={i + 1 <= Math.ceil(averageRating as number) ? '#53AC9A' : 'gray'}
                        />
                      </View>
                    ))}
                  </View>
                  <Text className='font-main mt-1 text-center'>{count} reviews</Text>
                </View>
              }
              renderItem={({ item }) => <ReviewCard key={item.id} review={item} />}
            />
          ) : (
            <View className='flex flex-row justify-center'>
              <Text className='font-main'>No reviews found</Text>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default ReviewsScreen;
