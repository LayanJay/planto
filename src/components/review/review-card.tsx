import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useRouter from '../../hooks/router/use-router';
import { useGetUser } from '../../hooks/user/use-get-user';
import { ReviewSchema } from '../../schemas/review-schema';

dayjs.extend(relativeTime);
type Props = {
  review: ReviewSchema;
  options?: boolean;
};

const ReviewCard = ({ review, options = false }: Props) => {
  const { user, loading } = useGetUser(review.author.id as string);
  const [expand, setExpand] = useState(false);
  const router = useRouter('Reviews');
  return (
    <>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View className={`w-full py-4 ${!options && 'border-t border-gray'}`}>
          <View className='flex flex-row justify-between items-center'>
            <View className='flex flex-row gap-4 max-w-xs'>
              <Avatar.Text
                size={50}
                label={
                  user?.first_name && user.last_name
                    ? user?.first_name[0] + user?.last_name[0]
                    : (user?.email?.split('@')[0].substring(0, 2) as string)
                }
              />

              {user && user.first_name && user.last_name && (
                <View className=' w-full'>
                  <Text className='font-main text-black'>
                    {user.first_name + ' ' + user?.last_name}
                  </Text>
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
            {options && (
              <View className='relative'>
                <TouchableOpacity onPress={() => setExpand(!expand)}>
                  <Icon size={20} name='more-vert' />
                </TouchableOpacity>
                {expand && (
                  <View className='absolute z-10 top-0 right-0 mt-6 bg-gray rounded-md w-28 px-4 py-2'>
                    <TouchableOpacity
                      className='w-full pb-2'
                      onPress={() => {
                        router.push('Edit Review', {
                          product_id: review.product.id as string,
                          review_id: review.id,
                        });
                        setExpand(false);
                      }}
                    >
                      <Text className='font-main text-black'>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className='w-full'
                      onPress={async () => {
                        await review.delete();
                        setExpand(false);
                      }}
                    >
                      <Text className='font-main text-black'>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>
          {review.text && <Text className='font-main mt-3 text-base -z-10'>{review.text}</Text>}
          <Text className='font-main text-right w-full mt-1 text-sm -z-10'>
            {dayjs(review.modified?.toDate()).fromNow()}
          </Text>
        </View>
      )}
    </>
  );
};

export default ReviewCard;
