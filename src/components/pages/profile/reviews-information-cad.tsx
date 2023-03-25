import { useUserReviews } from '../../../hooks/user/use-user-reviews';
import InformationCard from './information-card';

const ReviewsInformationCard = () => {
  const { count, loading } = useUserReviews();
  return <InformationCard title='Reviews' count={count} loading={loading} />;
};

export default ReviewsInformationCard;
