import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useGetUser } from '../../hooks/user/use-get-user';
import { ReviewSchema } from '../../schemas/review-schema';
dayjs.extend(relativeTime);
type Props = {
  review: ReviewSchema;
};

const ReviewCard = ({ review }: Props) => {
  const { user, loading } = useGetUser(review.author.id as string);
  return (
    <>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View className='w-full border-t border-gray py-4 '>
          <View className='flex flex-row gap-4'>
            <Image
              className='h-12 w-12 rounded-full'
              source={{
                uri: 'https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg',
              }}
            />
            {user && user.first_name && user.last_name && (
              <View className=' w-full'>
                <Text className='text-black'>{user.first_name + ' ' + user?.last_name}</Text>
                <View className='flex flex-row mt-1'>
                  {[...Array(5)].map((_, i) => (
                    <View key={i}>
                      <Icon
                        name={i + 1 <= review.rating ? 'star' : 'star-border'}
                        size={20}
                        color={i + 1 <= review.rating ? '#53AC9A' : 'gray'}
                      />
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
          {review.text && <Text className='mt-2 text-base'>{review.text}</Text>}
          <Text className='text-right w-full mt-1 text-sm'>
            {dayjs(review.modified?.toDate()).fromNow()}
          </Text>
        </View>
      )}
    </>
  );
};

export default ReviewCard;
