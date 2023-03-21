import _ from 'lodash';
import { ActivityIndicator, Text, View } from 'react-native';
import { Colors } from '../../../utils/colors';

interface Props {
  count: number;
  title: string;
  loading: boolean;
}

const InformationCard = (props: Props) => {
  return (
    <>
      {props.loading ? (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator color={Colors.TEAL_DARKER} />
        </View>
      ) : (
        <View className='flex-1 items-center justify-center space-y-2 bg-primary-light/30 rounded-2xl p-4'>
          <Text className='font-main font-semibold text-primary-dark/90 text-xs'>
            {props.title}
          </Text>
          <Text className='font-main font-medium text-primary-dark text-4xl'>
            {_.clamp(props.count, 0, 999)}
          </Text>
        </View>
      )}
    </>
  );
};

export default InformationCard;
