import {PropsWithChildren} from 'react';
import {SafeAreaView} from 'react-native';
import Container from './container';

const ScreenContainer = (props: PropsWithChildren) => {
  return (
    <SafeAreaView className='h-screen'>
      <Container containerClassNames='h-full'>{props.children}</Container>
    </SafeAreaView>
  );
};

export default ScreenContainer;
