import { useUserPurchases } from '../../../hooks/user/use-user-purchases';
import InformationCard from './information-card';

const PurchasesInformationCard = () => {
  const { count, loading } = useUserPurchases();
  return <InformationCard title='Purchases' count={count} loading={loading} />;
};

export default PurchasesInformationCard;
