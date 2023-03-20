import React from 'react';
import { Text } from 'react-native-animatable';
import { useGetReviewByUser } from '../../hooks/review/use-get-review-by-user';
import { useCurrentUser } from '../../hooks/user/use-current-user';
import ReviewPrompt from './review-prompt';
import YourReviewCard from './your-review-card';

type Props = {
  product_id: string;
};

const ReviewSection = ({ product_id }: Props) => {
  const { authUser, loading: authLoading } = useCurrentUser();
  const { review, exists, loading } = useGetReviewByUser(product_id, authUser?.uid as string);
  return (
    <>
      {loading || authLoading ? (
        <Text className='font-main'>Loading...</Text>
      ) : (
        <>
          {exists && review ? (
            <YourReviewCard review={review} />
          ) : (
            <ReviewPrompt product_id={product_id} />
          )}
        </>
      )}
    </>
  );
};

export default ReviewSection;
