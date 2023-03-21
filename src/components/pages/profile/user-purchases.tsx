import { ActivityIndicator, FlatList, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useUserPurchases } from '../../../hooks/user/use-user-purchases';
import PurchaseItem from './purchase-item';

interface Props {
  shrinkHeight: () => void;
}

const UserPurchases = (props: Props) => {
  const { purchases, loading } = useUserPurchases();
  return (
    <TouchableWithoutFeedback onPress={() => props.shrinkHeight()}>
      <View className='bg-white'>
        <View className='flex-1 bg-white -mx-6 -mt-6 rounded-t-[32px] px-6 py-6 mb-4'>
          <Text className='font-main font-semibold text-xl text-black pb-6'>My Purchases</Text>
        </View>
        {!loading && purchases ? (
          <FlatList
            className='h-full'
            data={purchases}
            renderItem={({ item }) => <PurchaseItem purchase={item} />}
          />
        ) : (
          <View className='flex items-center justify-center'>
            <ActivityIndicator />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserPurchases;
