import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { UserHelper } from '../../../helpers/user-helper';

interface Props {
  shrinkHeight: () => void;
}

const UserPurchases = (props: Props) => {
  const userPurchases = UserHelper.getSamplePurchases();
  // console.log('🚀 ~ file: user-purchases.tsx:10 ~ UserPurchases ~ userPurchases:', userPurchases);

  return (
    <TouchableWithoutFeedback onPress={() => props.shrinkHeight()}>
      <View className='flex-1 bg-white -mx-6 -mt-6 rounded-t-[32px] px-6 py-6'>
        <Text className='font-main font-semibold text-xl text-black pb-6'>My Purchases</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserPurchases;
