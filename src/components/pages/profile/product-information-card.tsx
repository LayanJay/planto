import { useUserProducts } from '../../../hooks/user/use-user-products';
import InformationCard from './information-card';

const ProductInformationCard = () => {
  const { count, loading } = useUserProducts();
  return <InformationCard title='Products' count={count} loading={loading} />;
};

export default ProductInformationCard;
