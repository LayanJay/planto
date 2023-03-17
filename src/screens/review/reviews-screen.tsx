import React from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Container from '../../components/layout/container';
import ReviewCard from '../../components/review/review-card';
import { useListReviews } from '../../hooks/review/use-list-reviews';
import useRouter from '../../hooks/use-router';
const ReviewsScreen = () => {
  const router = useRouter('Reviews');
  const { reviews, loading, count, averageRating } = useListReviews(router.params!.id);

  return (
    <Container containerClassNames='pt-8'>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {reviews && reviews.length > 0 ? (
            <View>
              <View className='flex flex-col items-center'>
                <Text className='text-5xl text-black font-main text-center font-semibold'>
                  {averageRating?.toFixed(2)}
                </Text>
                <View className='flex flex-row mt-2'>
                  {[...Array(5)].map((_, i) => (
                    <View key={i}>
                      <Icon
                        name={i + 1 <= Math.ceil(averageRating as number) ? 'star' : 'star-border'}
                        size={20}
                        color={i + 1 <= Math.ceil(averageRating as number) ? '#53AC9A' : 'gray'}
                      />
                    </View>
                  ))}
                </View>
                <Text className='mt-1 text-center'>{count} reviews</Text>
              </View>
              <SafeAreaView className='mt-8 mb-12 flex-1'>
                <FlatList
                  data={reviews}
                  renderItem={({ item }) => <ReviewCard key={item.id} review={item} />}
                />
              </SafeAreaView>
            </View>
          ) : (
            <View className='flex flex-row justify-center'>
              <Text>No reviews found</Text>
            </View>
          )}
        </>
      )}
    </Container>
  );
};

export default ReviewsScreen;
